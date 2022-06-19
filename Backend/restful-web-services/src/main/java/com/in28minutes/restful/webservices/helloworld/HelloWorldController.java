package com.in28minutes.restful.webservices.helloworld;

import org.springframework.web.bind.annotation.*;

//Controller
@RestController
@CrossOrigin(origins = "http://localhost:4200") // giving access to other servers
public class HelloWorldController {

    @GetMapping(value = "/hello-world")
    public String helloWorld(){
        return "Hello World";
    }

    //hello-world-bean
    @GetMapping(path = "/hello-world-bean")
    public HelloWorldBean helloWorldBean(){
        return new HelloWorldBean("Hello World Bean");
    }

    ///hello-world/path-variable/in28minutes
    @GetMapping("/hello-world/path-variable/{name}")
    public HelloWorldBean helloWorldPathVariable(@PathVariable String name){
        //throw new RuntimeException("Something went wrong");
         return new HelloWorldBean(String.format("Hello World, %s", name));
    }

}
