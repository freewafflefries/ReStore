import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@material-ui/core";
import { LoadingButton } from "@material-ui/lab";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import agent from "../../app/api/agent";
import { useStoreContext } from "../../app/context/StoreContext";
import NotFound from "../../app/errors/NotFound";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Product } from "../../app/models/product";

export default function ProductDetails() {

    const {id} = useParams<{id: string}>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [buttonLoading, setButtonLoading] = useState(false)

    
  const {setBasket} = useStoreContext();

  function handleAddItem(productId: number) {
    setButtonLoading(true);

    agent.Basket.addItem(productId)
      .then(basket => setBasket(basket))
      .catch(error => console.log(error))
      .finally(() => setButtonLoading(false))
  }

    useEffect(() => {
       agent.Catalog.details(parseInt(id))
            .then(response =>  {
                console.log(response)
                setProduct(response)
            })
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }, [id])

    if (loading) return <LoadingComponent message="Loading Product..." />

    if (!product) return <NotFound />

    return (
        <Grid container spacing={6}>
            <Grid item xs={6}>
                <img src={product.pictureUrl} alt={product.name} style={{width: '100%'}}/>
            </Grid>
            <Grid item xs={6}>
                <Typography variant='h4'>{product.name}</Typography>
                <Divider sx={{mb: 2}}/>
                <Typography variant='h4' color='secondary'>${(product.price / 100).toFixed(2)}</Typography>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>{product.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Description</TableCell>
                                <TableCell>{product.description}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Brand</TableCell>
                                <TableCell>{product.brand}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Type</TableCell>
                                <TableCell>{product.type}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>In Stock</TableCell>
                                <TableCell>{product.quantityInStock}</TableCell>
                            </TableRow>
                            
                        </TableBody>
                    </Table>
                </TableContainer>
                <LoadingButton 
                    loading={buttonLoading}
                    variant='contained' 
                    size='small'
                    sx={{marginTop:5}}
                    onClick={() => handleAddItem(parseInt(id))}>
                        Add to Cart
                </LoadingButton>
            </Grid>
        </Grid>
    )
}