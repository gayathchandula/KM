import React, { useEffect, useState } from "react";
import axios from "axios";
import { TextInput, Label, Button } from "flowbite-react";

export default function Login(props) {
  return (
    
      <form className="flex flex-col gap-4 justify-center item-center" onSubmit={props.onClick}>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1" value="Your email" />
          </div>
          <TextInput
            id="email1"
            type="email"
            placeholder="name@flowbite.com"
            required={true}
            value={props.email}
            onChange={props.handleEmail}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password1" value="Your password"  />
          </div>
          <TextInput id="password1" type="password" required={true} value={props.password} onChange={props.handlePassword}/>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    
  );
}
