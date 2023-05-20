import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    token: null,
	isLoggingActive: true,
    passwordValidity: {
		minChar: null,
		number: null,
		uppercase: null,
		specialChar: null,
	},
    passwordValidationWidth: 0,
    password: "",
    
};

const isNumberRegex = /\d/;
const specialCharacterRegex = /[ !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
const oneUppercase = /[A-Z]/;

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
          

            state.auth = action.payload;
        }
        ,
        setPassword:(state, action) => {
            state.password = action.payload;
        },
        setPasswordValidity: (state) => {
			state.passwordValidity = {
				minChar: state.password.length >= 8 ? true : false,
				number: isNumberRegex.test(state.password) ? true : false,
				uppercase: oneUppercase.test(state.password) ? true : false,
				specialChar: specialCharacterRegex.test(state.password) ? true : false,
			};
            
		},
        setPasswordValidationWidth: (state, action) => {
			state.passwordValidationWidth = Number(action.payload);
		},
    }
});


export const { setCredentials,setPasswordValidity,setPasswordValidationWidth ,setPassword} = authSlice.actions;

