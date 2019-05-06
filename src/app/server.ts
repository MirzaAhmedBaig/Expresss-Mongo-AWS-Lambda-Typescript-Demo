import app from './www/app';
import {HttpError} from 'http-errors';
import express, { Request, Response } from 'express';

//Handle all erros related to wrong urls
app.use((req:Request,res:Response)=>{
    res.status(404).json({
        message:"That route does not exist ☠️",
        status:404
    });
});

app.use((err:HttpError,req:Request,res:Response)=>{
    res.status(err.status).json({
        message: err.message || "Something went wrong. Please try again",
        status: err.status || 500
    });
});


app.listen(5000, () => {
    console.log(("App is running at 5000 port in %s mode"), app.get("env"));
});

export = app;