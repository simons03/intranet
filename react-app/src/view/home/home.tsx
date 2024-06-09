import {
  DigiButton,
  DigiDialog,
  DigiFormInput,
  DigiLayoutBlock,
  DigiLayoutContainer,
  DigiTable,
  DigiTypography,
  DigiTypographyHeadingJumbo,
} from "@digi/arbetsformedlingen-react";
import {
  ButtonSize,
  ButtonVariation,
  FormInputType,
  FormInputValidation,
  FormInputVariation,
  LayoutBlockVariation,
  TypographyHeadingJumboLevel,
} from "@digi/arbetsformedlingen";
import React from "react";
import { v4 as uuidv4 } from "uuid";

import axios from "axios";
import { ITasks } from "../../models/tasks";
import List from "../../components/list/list";
import Header from "../../components/header/header";
import { DigiFormInputCustomEvent } from "@digi/arbetsformedlingen/dist/types/components";
import Footer from "../../components/footer/footer";
import InfoText from "../../components/infotext/info-text";

export default function Home() {
  const [tasks, setTasks] = React.useState<ITasks[]>([]);
  const [validateTextBox, setValidateTextBox] =
    React.useState<FormInputValidation>(FormInputValidation.NEUTRAL);
  const [validateTextBoxRespPersion, setValidateTextBoxRespPersion] =
    React.useState<FormInputValidation>(FormInputValidation.NEUTRAL);
  const [sureYouWantToRemove, setSureYouWantToRemove] = React.useState(false);
  const [targetTask, setTargetTask] = React.useState<ITasks| undefined>();
  const [saved, setSaved] = React.useState(false);

  const getAllTasks = async () => {
    const res = await axios.get("http://localhost:8000/tasks");
    if (res) {
      const data = res.data as ITasks[];
      setTasks(data);
    }
  };

  const removeFromList = async () => {
    if (targetTask !== undefined) {
      try {
        const list = tasks.filter((x) => x.id !== targetTask.id);
        if (list) {
          setTasks(list);
          await axios.delete(`http://localhost:8000/tasks/${targetTask.id}`);
        }
        setTargetTask(undefined);
      } catch (e) {
        console.log(e);
      }
    }
  };
  const [taskText, setTaskText] = React.useState("");
  const [respPersion, setRespPersion] = React.useState("");
  const handleInputTaskText = (
    e: DigiFormInputCustomEvent<string | number>
  ) => {
    setTaskText(e.target.value.toString());
  };
  const handleRespPersion = (e: DigiFormInputCustomEvent<string | number>) => {
    setRespPersion(e.target.value.toString());
  };
  const addTaskToDb = async () => {
    let valid = true;
    if (taskText === "") {
      setValidateTextBox(FormInputValidation.ERROR);
      valid = false;
    } else {
      setValidateTextBox(FormInputValidation.NEUTRAL);
    }
    if (respPersion === "") {
      setValidateTextBoxRespPersion(FormInputValidation.ERROR);
      valid = false;
    } else {
      setValidateTextBoxRespPersion(FormInputValidation.NEUTRAL);
    }

    if (!valid) {
      return;
    }
    const payload = {
      id: uuidv4(),
      text: taskText,
      active: false,
      person: respPersion,
    };
    setValidateTextBox(FormInputValidation.NEUTRAL);
    setValidateTextBoxRespPersion(FormInputValidation.NEUTRAL);
    try {
      await axios.post("http://localhost:8000/tasks", payload);
      setTasks([...tasks, payload]);
      setTaskText("");
      setRespPersion("");
      setSaved(true);

      // hittade inte hur man kunde får digi-notification-alert att bara visas en liten stund så gjorde en egen timer på 3,5 sekunder för att visa rutan
      setTimeout(() => {
        setSaved(false);
      }, 3500);
    } catch (e) {
      console.log(e);
    }
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    addTaskToDb();
  };

  const closeModal = () => {
    setSureYouWantToRemove(false);
    setTargetTask(undefined);
  }

  React.useEffect(() => {
    if (targetTask !== undefined) {
      setSureYouWantToRemove(true);
    } else {
      setSureYouWantToRemove(false);
    }
  }, [targetTask]);

  React.useEffect(() => {
    getAllTasks();
  }, []);
  return (
    <div>
      <Header />
      <DigiLayoutBlock afVariation={LayoutBlockVariation.TRANSPARENT}>
        <div className="mb-2 container">
          <DigiLayoutContainer>
            <DigiTypographyHeadingJumbo
              afText="Intranätet av Simon Söderberg"
              afLevel={TypographyHeadingJumboLevel.H1}
            ></DigiTypographyHeadingJumbo>
          </DigiLayoutContainer>
        </div>
      </DigiLayoutBlock>

      <div>
        <DigiLayoutBlock afVariation={LayoutBlockVariation.PROFILE}>
          <div className="container py-2">
            <DigiTypography>
              <p style={{ color: "#fff" }}>
                Under den här sidan kan du spara uppdrag som behöver göras på
                kontoret. Du kan lägga till uppdrag och ta bort uppdrag. Du kan
                markera uppdragen som slutförda när du är klar, och om du kommer
                på att du missade nått så kan du avmarkera dem. Du kan även
                lägga till vem som är ansvarit för vilket uppdrag. Båda
                fälten måste vara ifyllda för att du ska kunna lägga till
                uppdrag 
              </p>
            </DigiTypography>
          </div>
        </DigiLayoutBlock>
        <div className="my-1">
          <DigiLayoutBlock afVariation={LayoutBlockVariation.TRANSPARENT}>
            <div className="container">
              <form>
                <div>
                  <div style={{ flex: 1 }}>
                    <DigiFormInput
                      afLabel="Lägg till ett uppdrag"
                      afVariation={FormInputVariation.MEDIUM}
                      afType={FormInputType.TEXT}
                      afValidation={validateTextBox}
                      afValidationText="Fältet kan inte vara tomt"
                      afRequiredText={"Obligatorisk*"}
                      value={taskText}
                      onAfOnChange={handleInputTaskText}
                      afRequired={true}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <DigiFormInput
                      afLabel="Lägg till ansvarig person"
                      afVariation={FormInputVariation.MEDIUM}
                      afType={FormInputType.TEXT}
                      afValidation={validateTextBoxRespPersion}
                      afValidationText="Fältet kan inte vara tomt"
                      afRequiredText={"Obligatorisk*"}
                      value={respPersion}
                      onAfOnChange={handleRespPersion}
                      afRequired={true}
                    />
                  </div>
                  <div style={{ marginBottom: "0.4em" }}>
                    <DigiButton
                      afSize={ButtonSize.LARGE}
                      afVariation={ButtonVariation.PRIMARY}
                      afFullWidth={false}
                      onClick={submit}
                    >
                      Lägg till
                    </DigiButton>
                  </div>
                </div>
              </form>
            </div>
          </DigiLayoutBlock>
        </div>

        <DigiLayoutBlock afVariation={LayoutBlockVariation.TRANSPARENT}>
          <div className="container my-2">
            <DigiTable>
              <table>
                <thead>
                  <tr>
                    <th scope="col">Status</th>
                    <th scope="col">Uppgift</th>
                    <th scope="col">Ansvarig</th>
                    <th scope="col">Editera</th>
                    <th scope="col">Ta bort</th>
                  </tr>
                </thead>
                {tasks.map((x) => {
                  return (
                    <List item={x} key={x.id} setTargetTask={setTargetTask} />
                  );
                })}
              </table>
            </DigiTable>
          </div>
        </DigiLayoutBlock>

        {/* <DigiButton onAfOnClick={MyFunction} afVariation={ButtonVariation.PRIMARY}>Skicka</DigiButton> */}
        <DigiDialog
          afShowDialog={sureYouWantToRemove}
          afHeading={`Ta bort`}
          afPrimaryButtonText="Ja"
          afSecondaryButtonText="Nej"
          onAfOnClose={() => setSureYouWantToRemove(false)}
          onAfSecondaryButtonClick={() => closeModal()}
          onAfPrimaryButtonClick={removeFromList}
        >
          <DigiTypography>
            <h3>
              Vill du ta bort{" "}
              <span style={{ textDecoration: "underline" }}>
                {targetTask?.text}
              </span>
              ?
            </h3>
          </DigiTypography>
        </DigiDialog>
      </div>
      <Footer />
      <div
        style={{
          display: saved ? "block" : "none",
          position: "fixed",
          top: 20,
          right: 20,
        }}
      >
        <InfoText />
      </div>
    </div>
  );
}
