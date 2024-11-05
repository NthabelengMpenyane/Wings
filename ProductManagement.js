import React, { useState } from 'react';
import './wings.css';

const ProductManagement = ({ products, setProducts, handleNewSale }) => {
    const [newProduct, setNewProduct] = useState({ name: '', description: '', quantity: 0, price: 0 });
    const [searchTerm, setSearchTerm] = useState('');
    const [editProduct, setEditProduct] = useState(null);
    const [sellQuantity, setSellQuantity] = useState(0); 

    const handleAddProduct = (e) => {
        e.preventDefault();
        if (!newProduct.name || newProduct.quantity < 0 || newProduct.price < 0) {
            alert("Please fill the spaces provided.");
            return;
        }
        const productWithId = { ...newProduct, id: Date.now() };
        setProducts([...products, productWithId]);
        setNewProduct({ name: '', description: '', quantity: 0, price: 0 });
    };
    const handleSell = (id, quantity) => {
        const product = products.find(p => p.id === id);
        if (!product) {
            console.error("Product not found");
            return;
        }
        if (quantity > product.quantity) {
            alert(`Cannot sell more quantity than the available ${product.name}`);
            return;
        }
        if (quantity <= 0) {
            alert("Quantity must be greater than zero.");
            return;
        }

        const updatedProducts = products.map(p =>
            p.id === id ? { ...p, quantity: p.quantity - quantity } : p 
        );
        setProducts(updatedProducts);
        setSellQuantity(0);
        handleNewSale(product.id, quantity, product);
    };

    const handleEditProduct = (product) => {
        setEditProduct(product);
        setNewProduct({ name: product.name, description: product.description, quantity: product.quantity, price: product.price });
    };

    const handleUpdateProduct = (e) => {
        e.preventDefault();
        if (!newProduct.name || newProduct.quantity < 0 || newProduct.price < 0) {
            alert("Fill all the provided fields");
            return;
        }

        const updatedProducts = products.map(p =>
            p.id === editProduct.id ? { ...newProduct, id: editProduct.id } : p 
        );

        setProducts(updatedProducts);
        setEditProduct(null);
        setNewProduct({ name: '', description: '', quantity: 0, price: 0 });
    };

    const handleDeleteProduct = (id) => {
        const filteredProducts = products.filter(p => p.id !== id);
        setProducts(filteredProducts);
    };

    return (
        <div>
            <h1>Product Management</h1>
            <form onSubmit={editProduct ? handleUpdateProduct : handleAddProduct}>
                <input 
                    type="text" 
                    placeholder="Product Name" 
                    value={newProduct.name} 
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} 
                />
                <input 
                    type="text" 
                    placeholder="Description" 
                    value={newProduct.description} 
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} 
                />
                <input 
                    type="number" 
                    placeholder="Quantity" 
                    value={newProduct.quantity} 
                    onChange={(e) => setNewProduct({ ...newProduct, quantity: parseInt(e.target.value) || 0 })} 
                />
                <input 
                    type="number" 
                    placeholder="Price" 
                    value={newProduct.price} 
                    onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) || 0 })} 
                />
                <button type="submit">{editProduct ? "Update Product" : "Add Product"}</button>
                {editProduct && <button type="button" onClick={() => setEditProduct(null)}>Cancel Edit</button>}
            </form>
            
            <h2>Search Product</h2>
            <input 
                type="text" 
                placeholder="Search" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
            />
            <h2>Product List</h2>
            <table id='product-mng'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Actions</th>
                        <th>Sell</th>
                    </tr>
                </thead>
                <tbody>
                    {products
                        .filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
                        .map(product => (
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>{product.description}</td>
                                <td>{product.quantity}</td>
                                <td>M{product.price.toFixed(2)}</td>
                                <td>
                                    <button onClick={() => handleEditProduct(product)}>Edit</button>
                                    <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                                </td>
                                <td>
                                    <input 
                                        type="number" 
                                        value={sellQuantity} 
                                        onChange={(e) => setSellQuantity(parseInt(e.target.value) || 1)}                                        placeholder="Quantity"
                                        min="1"
                                    />
                                    <button onClick={() => handleSell(product.id, sellQuantity)} disabled={product.quantity <= 0}>
                                        Sell
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};
export default ProductManagement;