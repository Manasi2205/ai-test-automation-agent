"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { UserDetailContext } from '@/context/UserDetailContext';
import { useUser } from "@clerk/nextjs";  // ← add this

function Provider({ children }: Readonly<{ children: React.ReactNode }>) {
    const { user, isLoaded } = useUser();  // ← add this
    const [userDetail, setUserDetail] = useState<any>();

    useEffect(() => {
        if (isLoaded && user) {  // ← only call when Clerk is ready AND user exists
            CreateNewUser();
        }
    }, [isLoaded, user])  // ← watch these values

    const CreateNewUser = async () => {
        const result = await axios.post('/api/users', {});
        console.log("Result", result);
        setUserDetail(result.data?.user);
    }

    return (
        <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
            <div>{children}</div>
        </UserDetailContext.Provider>
    )
}

export default Provider