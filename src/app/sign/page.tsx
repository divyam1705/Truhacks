"use client"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Navbar from "@/components/navbar"
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
function Signpage() {
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
    const addUser = async (name: string, email: string, id: string) => {
        console.log("adding user")
        try {
            const userDoc = await getDoc(doc(db, "users", id));

            if (userDoc.exists()) { return; }
            console.log("n")
            const userRef = doc(db, "users", id);
            await setDoc(userRef, {
                name: name,
                email: email,
                id: id,
            });
            console.log("User added successfully!");
        } catch (error) {
            console.error("Error adding user:", error);
        }
    };
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
                handleCallback(user.displayName ?? "noname", user.email ?? "nomail", user.uid);
            }
        } catch (error: any) {
            alert("Error Signing in with Google");
            console.error("Error signing in with Google:", error);
        }
        setsubmitload(false);
    };

    // const handleSignUp = (event: any) => {
    //     event.preventDefault();
        // setsubmitload(true);
        // const displayName = credentials.name;
        // console.log(credentials);
        // firebase
        //     .auth()
        //     .createUserWithEmailAndPassword(credentials.email, credentials.password)
        //     .then(async (userCredential) => {
        //         // Handle successful sign up here
        //         const user = userCredential.user;
        //         if (user) {
        //             await user.updateProfile({
        //                 displayName: credentials.name,
        //             });
        //             console.log("Sign up successful!", user);
        //             localStorage.setItem("userEmail", user.email ?? "nomail");
        //             localStorage.setItem("uid", user.uid);
        //             user.getIdToken().then((token) => {
        //                 localStorage.setItem("authToken", token);
        //             });
        //             localStorage.setItem("userName", credentials.name);
        //             console.log("Created");
        //             handleCallback(displayName, user.email ?? "nomial", user.uid);
        //         }
        //     })
        //     .catch((error) => {
        //         const errorCode = error.code;
        //         const errorMessage = error.message;
        //         console.error("Sign up failed:", errorCode, errorMessage);
        //         alert("Sign up Failed : " + errorMessage);
        //     });
        // setsubmitload(false);
    // };

    const handleCallback = async (name: string, email: string, uid: string) => {
        setsubmitload(true);
        addUser(name, email, uid)
            .then((docRef) => {
                console.log("User added ");
                router.push("/");
                window.location.reload();
            })
            .catch((error) => {
                console.error("Error adding user: ", error);
            });
        router.push("/");
        setsubmitload(false);

    };

    // const onChange = (event: any) => {
    //     setcredentials({ ...credentials, [event.target.name]: event.target.value });
    // };
    const formSchema = z.object({
        name: z.string().min(2, {
            message: "Username must be at least 2 characters.",
        }),
        email: z.string().email(),
        password: z.string()
    });
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });
    function onSubmit(credentials: z.infer<typeof formSchema>) {
        setsubmitload(true);
        const displayName = credentials.name;
        console.log(credentials);
        firebase
            .auth()
            .createUserWithEmailAndPassword(credentials.email, credentials.password)
            .then(async (userCredential) => {
                // Handle successful sign up here
                const user = userCredential.user;
                if (user) {
                    await user.updateProfile({
                        displayName: credentials.name,
                    });
                    console.log("Sign up successful!", user);
                    localStorage.setItem("userEmail", user.email ?? "nomail");
                    localStorage.setItem("uid", user.uid);
                    user.getIdToken().then((token) => {
                        localStorage.setItem("authToken", token);
                    });
                    localStorage.setItem("userName", credentials.name);
                    console.log("Created");
                    handleCallback(displayName, user.email ?? "nomial", user.uid);
                }
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error("Sign up failed:", errorCode, errorMessage);
                alert("Sign up Failed : " + errorMessage);
            });
        setsubmitload(false);
        // console.log(values)
    }
    return (
        <>
        <Navbar/>
            <div className='h-screen flex justify-center items-center '>

                <Card className="w-[80vw] max-w-[500px]">
                    <CardHeader>
                        <CardTitle>Sign In</CardTitle>
                        {/* <CardDescription>Card Description</CardDescription> */}
                    </CardHeader>
                    <CardContent>


                        {/* <Button variant="outline">Shadd</Button> */}
                        <Form {...form} >
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Username</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Name" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                This is your public display name.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Email" {...field} />
                                            </FormControl>
                                            <FormMessage />
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
                                            <FormMessage />
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
                            <img
                                className="sign-in mr-3 "
                                width="25 px"
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

export default Signpage