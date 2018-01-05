<?php namespace App\services;
use \Firebase\JWT\JWT;

class Authentication{
    protected const SERVER_NAME = 'Timediary Host';
    protected const ALGORITHM = 'HS512';
    public static function makeJwt($data){
        $secret = self::currentSecretKey();
        
        $jwt = [
            // issued at
            'iat' => time(),
            // json token uid
            'jti' => base64_encode(random_bytes(32)),
            // issuer
            'iss' => self::SERVER_NAME,
            // not before,
            'nbf' => null,
            // expiration 1h
            'exp' => time() + 3600,
            // data
            'data' => $data,
        ];

        $jwt = JWT::encode(
            $jwt,
            $secret,
            self::ALGORITHM
        );

        return [
            'token' => $jwt,
            // para ajudar a testar
            // 'secret' => $secret
        ];
    }
    public static function getTokenData($jwt){
        return (array)(JWT::decode($jwt, self::currentSecretKey(), [self::ALGORITHM]));
    }
    public static function currentSecretKey(){
        return base64_encode(date("WY"));
    }
}