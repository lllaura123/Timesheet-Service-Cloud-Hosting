package com.exxeta.timesheetapproveservice.domain;

import lombok.Data;

@Data
public class AppLoginData {
    private final String appUser;
    private final String appPassword;
    private final boolean isStudent;

}
