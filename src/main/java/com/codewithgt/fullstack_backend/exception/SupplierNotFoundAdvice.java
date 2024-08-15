package com.codewithgt.fullstack_backend.exception;

import com.codewithgt.fullstack_backend.exception.PharmacistNotFoundException;
import com.codewithgt.fullstack_backend.exception.SupplierNotFoundException;
import com.codewithgt.fullstack_backend.exception.UserNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import java.util.HashMap;
import java.util.Map;
@ControllerAdvice
public class SupplierNotFoundAdvice {
    @ResponseBody
    @ExceptionHandler(SupplierNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Map<String,String>exceptionHandler(SupplierNotFoundException exception){
        Map<String,String> errorMap=new HashMap<>();
        errorMap.put("errorMessage", exception.getMessage());
        return errorMap;
    }
}
