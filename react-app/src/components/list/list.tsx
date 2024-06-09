import React from "react";
import { ITasks } from "../../models/tasks";
import {
  DigiButton,
  DigiFormCheckbox,
  DigiFormInput,
  DigiTypography,
} from "@digi/arbetsformedlingen-react";
import {
  ButtonSize,
  ButtonVariation,
  FormCheckboxVariation,
  FormInputType,
  FormInputValidation,
  FormInputVariation,
} from "@digi/arbetsformedlingen";
import axios from "axios";
import { DigiFormInputCustomEvent } from "@digi/arbetsformedlingen/dist/types/components";

export default function List({
  item,
  setTargetTask,
}: {
  item: ITasks;
  setTargetTask: React.Dispatch<React.SetStateAction<ITasks | undefined>>;
}) {
  const [checked, setChecked] = React.useState<boolean>(item.active);
  const [edit, setEdit] = React.useState(false);
  const [text, setText] = React.useState(item.text);
  const [person, setPerson] = React.useState(item.person);

  const handleChangeText = (e: DigiFormInputCustomEvent<string | number>) => {
    setText(e.target.value.toString());
  };
  const handleChangePerson = (e: DigiFormInputCustomEvent<string | number>) => {
    setPerson(e.target.value.toString());
  };

  React.useEffect(() => {
    if (!edit) {
      saveIfEdit();
    }
  }, [edit]);

  const saveIfEdit = async () => {
    const payload = {
      id: item.id,
      text: text,
      active: checked,
      person: person,
    };

    try {
      await axios.patch(`http://localhost:8000/tasks/${item.id}`, payload);
    } catch (e) {
      console.log(e);
    }
  };
  const handleClick = async () => {
    setChecked(!checked);

    const payload = {
      id: item.id,
      text: text,
      active: !checked,
      person: person,
    };

    try {
      await axios.patch(`http://localhost:8000/tasks/${item.id}`, payload);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <tbody>
      <tr>
        <td>
          <DigiFormCheckbox
            afLabel={checked ? "Slutförd" : "Påbörjad"}
            afVariation={FormCheckboxVariation.PRIMARY}
            checked={checked}
            onAfOnChange={handleClick}
          />
        </td>
        <td>
          {" "}
          {!edit ? (
            <DigiTypography>
              <p style={{ textDecoration: checked ? "line-through" : "none" }}>
                {text}
              </p>
            </DigiTypography>
          ) : (
            <form>
              <DigiFormInput
                afLabel=""
                afVariation={FormInputVariation.MEDIUM}
                afType={FormInputType.TEXT}
                afValidation={FormInputValidation.NEUTRAL}
                value={text}
                onAfOnChange={handleChangeText}
              ></DigiFormInput>
            </form>
          )}
        </td>
        <td>
          {!edit ? (
            <DigiTypography>
              <p style={{ textDecoration: checked ? "line-through" : "none" }}>
                {person}
              </p>
            </DigiTypography>
          ) : (
            <form>
              <DigiFormInput
                afLabel=""
                afVariation={FormInputVariation.MEDIUM}
                afType={FormInputType.TEXT}
                afValidation={FormInputValidation.NEUTRAL}
                value={person}
                onAfOnChange={handleChangePerson}
              ></DigiFormInput>
            </form>
          )}
        </td>
        <td>
          <DigiButton
            afSize={ButtonSize.SMALL}
            afVariation={ButtonVariation.FUNCTION}
            afFullWidth={false}
            onAfOnClick={() => setEdit(!edit)}
          >
            {" "}{edit ? "Spara" : "Ändra"}{" "}
          </DigiButton>
        </td>
        <td>
          <DigiButton
            afSize={ButtonSize.SMALL}
            afVariation={ButtonVariation.FUNCTION}
            afFullWidth={false}
            onAfOnClick={() => setTargetTask(item)}
          >
            Ta bort
          </DigiButton>
        </td>
      </tr>
    </tbody>
  );
}
