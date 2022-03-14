import { Strategy, VerifiedCallback } from 'passport-jwt';
declare const JwtStartegy_base: new (...args: any[]) => Strategy;
export declare class JwtStartegy extends JwtStartegy_base {
    constructor();
    validate(payload: any, done: VerifiedCallback): Promise<void>;
}
export {};
