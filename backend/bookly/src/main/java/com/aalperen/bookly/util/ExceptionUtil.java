package com.aalperen.bookly.util;

import com.aalperen.bookly.entity.generic.ReturnCodes;
import com.aalperen.bookly.exception.BusinessException;
import lombok.experimental.UtilityClass;

@UtilityClass
public class ExceptionUtil {


    public void handleException(Exception ex){
        if (ex instanceof BusinessException e) {
            throw new BusinessException(e.getMessage(),
                    e.getCode(), ex.getMessage());
        }
        throw new BusinessException(ex.getMessage(),
                ReturnCodes.INTERNAL_SERVER_ERROR.intValue(), ex.getMessage());
    }
}
