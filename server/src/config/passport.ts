import * as express from "express";
import models from "../models";
import { jwtConfig } from "./sessionConfig";

const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

type JwtStrategyOption = {
    jwtFromRequest: string
    secretOrKey: string
}

const opts: JwtStrategyOption = {
    jwtFromRequest: '',
    secretOrKey: ''
};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = jwtConfig.secret


passport.use(
    new JwtStrategy(opts, (payload: {user: UserInstance}, done: (...params:any) => void) => {        
        models.User.findOne({
            where: {
              id: payload.user.id
            },
            raw: true
        }).then(user => {            
            if (user) {
                return done(null, user);
            }    
            return done(null, false);
        })
        .catch(err => {            
            return done(err, false);
        });
    })
);

const passportConfig = async (app: express.Application) => {
    app.use(passport.initialize());
};

export default passportConfig;