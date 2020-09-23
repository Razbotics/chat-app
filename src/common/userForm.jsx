import React from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";

function UserForm({
  formComponensts,
  submitButtonName,
  onChange,
  onSubmit,
  styleClass,
}) {
  return (
    <form onSubmit={(e) => onSubmit(e)} className={styleClass.form}>
      {formComponensts.map((component) => (
        <FormControl key={component.id} required fullWidth margin="normal">
          <InputLabel htmlFor={component.id}>{component.placeholder}</InputLabel>
          <Input
            autoComplete={component.type}
            type={component.type}
            onChange={(e) => onChange(component.stateVal, e)}
            autoFocus={component.autoFocus}
            id={component.id}
          ></Input>
        </FormControl>
      ))}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={styleClass.submit}
      >
        {submitButtonName}
      </Button>
    </form>
  );
}

export default UserForm;
