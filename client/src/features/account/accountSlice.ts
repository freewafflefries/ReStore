import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { FieldValues } from "react-hook-form";
import { toast } from "react-toastify";
import { history } from "../..";

import agent from "../../app/api/agent";
import { User } from "../../app/models/user";
import { setBasket } from "../basket/basketSlice";

interface AccountState {
    user: User | null;

}

const initialState: AccountState = {
    user: null
}

export const signInUser = createAsyncThunk<User, FieldValues, {}>(
    'account/signInUser',
    async (data, thunkApi) => {
        try {
            //console.log('signInUser async Thunk', data)
            const userDto = await agent.Account.login(data)
            //This trick in destructuring allows use to break off basket its own object,
            //and then everything else from userDto into another object called user
            const { basket, ...user } = userDto;
            if (basket) {
                thunkApi.dispatch(setBasket(basket))
            }
            localStorage.setItem('user', JSON.stringify(user))

            return user
        } catch (error: any) {
            return thunkApi.rejectWithValue({ error: error.data })
        }
    }
)


export const fetchCurrentUser = createAsyncThunk(
    'account/currentUser',
    async (_, thunkApi) => {
        thunkApi.dispatch(setUser(JSON.parse(localStorage.getItem('user')!)))
        try {
            const userDto = await agent.Account.currentUser()
            const { basket, ...user } = userDto;
            if (basket) {
                thunkApi.dispatch(setBasket(basket))
            }
            localStorage.setItem('user', JSON.stringify(user))
            return user
        } catch (error: any) {
            return thunkApi.rejectWithValue({ error: error.data })
        }
    },
    {
        //function that returns true/false that will determine if we execute the payload creator
        //True = execute, False = do not execute
        condition: () => {
            if (!localStorage.getItem('user')) return false
        }
    }
)

export const accountSlice = createSlice({
    name: 'account',
    initialState: initialState,
    reducers: {
        signOut: (state: any) => {
            console.log('logging out user')
            state.user = null;
            console.log('state.user: ', state.user)
            localStorage.removeItem('user')
            history.push('/')
        },
        setUser: (state: any, action: any) => {
            state.user = action.payload;
        }
    },

    extraReducers: (builder) => {
        builder.addCase(fetchCurrentUser.rejected, (state) => {
            state.user = null;
            localStorage.removeItem('user')
            toast.error('Session expired. Please login again.')
            history.push('/')
        })
        builder.addMatcher(isAnyOf(signInUser.fulfilled, fetchCurrentUser.fulfilled), (state: any, action) => {
            state.user = action.payload
        })
        builder.addMatcher(isAnyOf(signInUser.rejected, fetchCurrentUser.rejected), (state: any, action) => {
            throw action.payload
        })
    }

})

export const { signOut, setUser } = accountSlice.actions