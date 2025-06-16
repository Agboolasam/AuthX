import React from 'react'
import api from '../api/api'

async function dashboard() {
    try {
        const response = await api.get('/dashboard');
        if (response.status !== 200) {
            throw new Error('Failed to fetch dashboard data');
        }
        const data = response.data;
        return (
            <div>
                welcome {data.user.name}
            </div>
        )
    }
    catch (error) {
        console.error("Error fetching dashboard data:", error);
    }
}

export default dashboard
