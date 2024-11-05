import React from 'react';
import './wings.css';

const Dashboard = ({ handleLogout, products, soldProducts }) => {
    return (
        <div>
            <h1>Dashboard</h1>
            <h2>Available Products</h2>
            <table>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Available Stock</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h3>Total Stock Available: {products.reduce((acc, product) => acc + product.quantity, 0)}</h3>
            <h2>Sold Products</h2>
            <table>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Quantity Sold</th>
                        <th>Time </th>
                    </tr>
                </thead>
                <tbody>
                    {soldProducts.map((soldProduct, index) => (
                        <tr key={index}>
                            <td>{soldProduct.name}</td>
                            <td>{soldProduct.quantity}</td>
                            <td>{soldProduct.time}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h3>Total Products Sold: {soldProducts.reduce((acc, soldProduct) => acc + soldProduct.quantity, 0)}</h3> 
        </div>
    );
};
export default Dashboard;