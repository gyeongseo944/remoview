import React, { useState } from "react";
import moment from "moment";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../_actions/user_action";
import { useNavigate } from "react-router-dom";
import Auth from "../../../hoc/auth";

import { Form, Input, Button } from "antd";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFromItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

function RegisterPage(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{
        email: "",
        lastname: "",
        name: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().required("Name is required"),
        lastname: Yup.string().required("Lastname is required"),
        email: Yup.string().email("email is invalid").required("email is required"),
        password: Yup.string().min(6, "password must be at least 6 characters").required("password is required"),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref("password"), null], "passwords must be matched")
          .required("Confirm password is required"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          let dataToSubmit = {
            email: values.email,
            password: values.password,
            name: values.name,
            lastname: values.lastname,
            image: `http://gravatar.com/avatar/${moment().unix()}?d=identicon`,
          };
          dispatch(registerUser(dataToSubmit)).then((res) => {
            if (res.payload.success) {
              navigate("/login");
            } else {
              if (res.payload.err.keyValue.email) {
                alert("이미 사용중인 이메일 입니다.");
              } else {
                alert("회원가입에 실패했습니다.");
              }
            }
          });
          setSubmitting(false);
        }, 500);
      }}
    >
      {(props) => {
        const { values, touched, errors, dirty, isSubmitting, handleChange, handleBlur, handleSubmit, handleReset } = props;
        return (
          <div className="app">
            <h2>Sign up</h2>
            <Form style={{ minWidth: "375px" }} {...formItemLayout} onSubmit={handleSubmit}>
              <Form.Item required label="Name">
                <Input
                  id="name"
                  placeholder="Enter your name"
                  type="text"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.name && touched.name ? "text-input error" : "text-input"}
                />
                {errors.name && touched.name && <div className="input-feedback">{errors.name}</div>}
              </Form.Item>
              <Form.Item required label="Lastname">
                <Input
                  id="lastname"
                  placeholder="Enter your lastname"
                  type="text"
                  value={values.lastname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.lastname && touched.lastname ? "text-input error" : "text-input"}
                />
                {errors.lastname && touched.lastname && <div className="input-feedback">{errors.lastname}</div>}
              </Form.Item>

              <Form.Item required label="Email" hasFeedback validateStatus={errors.email && touched.email ? "error" : "success"}>
                <Input
                  id="email"
                  placeholder="Enter your Email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.email && touched.email ? "text-input error" : "text-input"}
                />
                {errors.email && touched.email && <div className="input-feedback">{errors.email}</div>}
              </Form.Item>

              <Form.Item required label="Password" hasFeedback validateStatus={errors.password && touched.password ? "error" : "success"}>
                <Input
                  id="password"
                  placeholder="Enter your password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.password && touched.password ? "text-input error" : "text-input"}
                />
                {errors.password && touched.password && <div className="input-feedback">{errors.password}</div>}
              </Form.Item>

              <Form.Item required label="Confirm">
                <Input
                  id="confirmPassword"
                  placeholder="Enter your confirmPassword"
                  type="password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.confirmPassword && touched.confirmPassword ? "text-input error" : "text-input"}
                />
                {errors.confirmPassword && touched.confirmPassword && <div className="input-feedback">{errors.confirmPassword}</div>}
              </Form.Item>
              <Form.Item {...tailFromItemLayout}>
                <Button onClick={handleSubmit} type="primary" disabled={isSubmitting}>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
}

export default Auth(RegisterPage, false);
