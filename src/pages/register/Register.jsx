import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Input from "../../components/inputs/Input";
import { toast } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { useCallback } from "react";
import Button from "../../components/Button";
import Heading from "../../components/Heading";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import newRequest from "../../utils/newRequest";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const res = await newRequest.post("/auth/register", {
        email: data.email,
        password: data.password,
        name: data.name,
      });
      if (res.data === "success") {
        toast.success("Registered!");
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response.data[0].defaultMessage);
    }
  };

  return (
    <div className="flex flex-col justify-center w-auto h-full mx-auto bg-white border-0 rounded-lg shadow-lg p-7 lg:w-3/6 lg:h-auto md:h-auto">
      {/*header*/}
      <div
        className="
                flex 
                items-center 
                p-6
                mt-9
                rounded-t
                justify-center
                border-b-[1px]
                "
      >
        <div className="mt-4 text-lg font-semibold">회원가입</div>
      </div>

      <div className="relative flex-auto p-6">
        <div className="flex flex-col gap-4">
          <Heading title="Welcome to Airbnb" subtitle="Create an account!" />
          <Input
            id="name"
            label="name"
            type="name"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />

          <Input
            id="email"
            label="Email"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <Input
            id="password"
            label="Password"
            type="password"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
        </div>
      </div>
      {/*footer*/}
      <div className="flex flex-col gap-2 p-6">
        <div className="flex flex-row items-center w-full gap-4 ">
          <Button label="회원가입" onClick={handleSubmit(onSubmit)} />
        </div>
        {/* {footer} */}

        <div className="flex flex-col gap-4 mt-3">
          <hr />
          <Button
            outline
            label="Continue with Google"
            icon={FcGoogle}
            onClick={() => {}}
          />
          <Button
            outline
            label="Continue with Github"
            icon={AiFillGithub}
            onClick={() => {}}
          />
          <div className="mt-4 font-light text-center text-neutral-500">
            <p>
              Already have an account?
              <span
                onClick={() => navigate("/login")}
                className="cursor-pointer text-neutral-800 hover:underline"
              >
                {" "}
                Login
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
