import React, { Component } from 'react';
import { Formik } from 'formik';
import { Input, Button } from 'antd';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './Register.styl';

export default class Register extends Component {
    validate = (values) => {
        const errors = {};
        if (!values.firstname) {
            errors.firstname = 'این فیلد الزامی است.';
        }

        if (!values.lastname) {
            errors.lastname = 'این فیلد الزامی است.';
        }
        return errors;
    };

    handleSubmit = (values) => {
        console.log('values are here', values);
    };

    render() {
        return (
            <div>
                <Header />
                {/*<div className="l-container signup-background">*/}
                <div className="signup-wrapper">
                    <Formik
                        initialValues={{ firstname: '', lastname: '' }}
                        validate={this.validate}
                        onSubmit={this.handleSubmit}
                    >
                        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                            <form onSubmit={handleSubmit}>
                                <Input
                                    type="text"
                                    name="firstname"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.firstname}
                                />
                                {errors.firstname && touched.firstname && errors.firstname}
                                <Input
                                    type="text"
                                    name="lastname"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.lastname}
                                />
                                <Input
                                    type="text"
                                    name="mobile"
                                    value={values.mobile}
                                />
                                {errors.lastname && touched.lastname && errors.lastname}
                                <button type="submit" disabled={isSubmitting}>
                                    Submit
                                </button>
                            </form>
                        )}
                    </Formik></div>
                {/*</div>*/}
                <Footer />
            </div>
        );
    }
}
