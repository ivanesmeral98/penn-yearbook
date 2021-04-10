/* eslint-disable no-console */
/* eslint-disable react/button-has-type */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'

const evaApi = {
    a: 1,
    b: 2,
    c: 3,
}
const key = process.env.PRIVATE_KEY

const Test = () => {
    // Access the client
    const queryClient = useQueryClient()
    console.log(key)

    return (
        <div>
            <h1>yerr</h1>
        </div>
    )
}

export default Test
