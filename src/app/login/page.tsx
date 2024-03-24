"use client"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import firebase from "firebase/compat/app";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { db } from "../firebase";
import {
    setDoc,
    doc,
    collection,
    addDoc,
    query,
    updateDoc,
    arrayUnion,
    orderBy,
    limit,
    getDoc,
    where,
} from "firebase/firestore";
// import Navbar from "@/components/navbar";
function Loginpage() {
    interface creds {
        name: string,
        email: string,
        password: string
    }
    const router = useRouter();
    const [credentials, setcredentials] = useState<creds>({
        name: "",
        email: "",
        password: "",
    });
    
    const [submitload, setsubmitload] = useState(false);

    const handleGoogleSignIn = async () => {
        console.log("Inside Google");
        setsubmitload(true);
        const provider = new firebase.auth.GoogleAuthProvider();
        const result = await firebase.auth().signInWithPopup(provider);
        // Signed in with Google
        try {
            if (result.user) {
                const user = result.user;
                localStorage.setItem("userEmail", user.email ?? "nomail");
                localStorage.setItem("uid", user.uid);
                const token = await user.getIdToken();
                localStorage.setItem("authToken", token);
                localStorage.setItem("userName", user.displayName ?? "noname");
                // console.log("google")
                handleCallback();
            }
        } catch (error: any) {
            alert("Error Signing in with Google");
            console.error("Error signing in with Google:", error);
        }
        setsubmitload(false);
    };

    
    const handleEmailPasswordSignIn = () => {
    setsubmitload(true);
    firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
      .then((userCredential) => {
        const user = userCredential.user;
        if(user){localStorage.setItem("userEmail",user.email??"nomail");
        localStorage.setItem("uid",user.uid);
        user.getIdToken().then(token => {
          localStorage.setItem('authToken', token);
          handleCallback();
        });
    localStorage.setItem("userName",user.displayName??"noname");
      }})
      .catch((error) => {
        alert("Error signing in with email and password");
        console.error('Error signing in with email and password:', error);
      });
      setsubmitload(false);
      
  };
    const handleCallback = async () => {
       
        
        router.push("/");

    };

    const formSchema = z.object({
        email: z.string().email(),
        password: z.string()
    });
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });
    function onSubmit(credentials: z.infer<typeof formSchema>) {
        setsubmitload(true);
    firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
      .then((userCredential) => {
        const user = userCredential.user;
        if(user){
        localStorage.setItem("userEmail",user.email??"nomail");
        localStorage.setItem("uid",user.uid);
        user.getIdToken().then(token => {
          localStorage.setItem('authToken', token);
          handleCallback();
        });
    localStorage.setItem("userName",user.displayName??"noname");
      }}
      )
      .catch((error) => {
        alert("Error signing in with email and password");
        console.error('Error} signing in with email and password:', error);
      });
      setsubmitload(false);
    }
    return (
        <>
        {/* <Navbar/> */}
            <div className='h-screen flex justify-center items-center'>

                <Card className="w-[80vw] max-w-[500px]">
                    <CardHeader>
                        <CardTitle>LogIn</CardTitle>
                        {/* <CardDescription>Card Description</CardDescription> */}
                    </CardHeader>
                    <CardContent>


                        {/* <Button variant="outline">Shadd</Button> */}
                        <Form {...form} >
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Email" {...field} />
                                            </FormControl>
                                            {/* <FormMessage /> */}
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input type="password" placeholder="Password" {...field} />
                                            </FormControl>
                                            {/* <FormMessage /> */}
                                        </FormItem>
                                    )}
                                />
                                <div className="flex justify-center items-center">
                                <Button  type="submit">Submit</Button>
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                    <CardFooter className="flex justify-center items-center">
                        <Button variant="outline" onClick={handleGoogleSignIn}>
                            <Image
                                className="sign-in mr-3 "
                                width={25}
                                height={25}
                                alt="Google sign-in"
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy3yt2UdGKpuLH_WHF0JOKg8cYJHSVarNH5Q&usqp=CAU"
                            />
                            Continue with Google</Button>
                            
                    </CardFooter>
                </Card>
            </div>
            
        </>
    )
}

export default Loginpage