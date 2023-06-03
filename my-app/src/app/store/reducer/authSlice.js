import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    token: JSON.parse(localStorage.getItem('token')) || null,
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
            state.token = action.payload;
            console.log(state.token);
            localStorage.setItem('token', JSON.stringify(state.token));
            console.log(localStorage.getItem('token'));
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
        clearPassword: (state) => {
            state.password = "";
        },
        clearPasswordValidity: (state) => {
            state.passwordValidity = {
                minChar: null,
                number: null,
                uppercase: null,
                specialChar: null,
            };

        },
        setToken: (state, action) => {
            state.token = action.payload;
            localStorage.setItem('token', JSON.stringify(state.token));
          },
    }
});


export const { setCredentials,setPasswordValidity,setPasswordValidationWidth
     ,setPassword ,clearPassword,clearPasswordValidity,setToken} = authSlice.actions;

