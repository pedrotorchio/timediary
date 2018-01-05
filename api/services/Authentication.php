<?php namespace App\services;
use \Firebase\JWT\JWT;

class Authentication{
    protected const SERVER_NAME = 'Timediary Host';

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
            $secrete,
            'HS512'
        );

        return json_encode([
            'token' => $jwt,
            'secret' => $secret
        ]);
    }
    public static function currentSecretKey(){
        return base64_encode(date("WY"));
    }
}