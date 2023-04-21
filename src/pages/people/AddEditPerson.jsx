import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useUser } from "../../context/userContext";
import CheckAuth from "../../utils/CheckAuth";
import useAccessDbHook from "../../hooks/useAccessDb";

import * as Styled from "../../styled/components";
import { motion } from "framer-motion";

export default function AddEditPerson() {
  const offset = -4; // the time difference between EST & UTC

  const [updatedPerson, setUpdatedPerson] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [formValid, setFormValid] = useState(false);
  const [avatarSeed, setAvatarSeed] = useState(crypto.randomUUID());

  const { personId } = useParams();
  const [authenticatedUserToken, _setAuthenticatedUserToken] = useUser();
  const accessDb = useAccessDbHook();
  const [person, setPerson] = useState({
    avatar: "",
    fullName: "",
    dob: "",
    gifts: "",
  });

  useEffect(() => {
    if (personId) {
      // console.log("fetch updatedPerson data with id: ", personId);
      const url = `https://gift-backend.onrender.com/api/people/${personId}`;
      let request = new Request(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authenticatedUserToken}`,
          "content-type": "application/json",
        },
      });
      fetch(request)
        .then((res) => {
          if (res.status === 401) throw new Error("Unauthorized access to API.");
          if (!res.ok) throw new Error("Invalid response.");
          return res.json();
        })
        .then((data) => {
          let personData = data.data;
          setUpdatedPerson({
            //setting fetched data updatedPerson in state
            ownerID: personData.ownerID,
            _id: personData._id,
            avatar: personData.avatar,
            fullName: personData.fullName,
            dob: new Date(personData.dob).toISOString().slice(0, 10),
            gifts: personData.gifts,
            createdAt: personData.createdAt,
          });
          setAvatarSeed(personData.avatar.split("seed=")[1].split("&")[0]);
        })
        .catch(console.warn);
    }
  }, []);

  useEffect(() => {
    setUpdatedPerson((prevPerson) => ({
      ...prevPerson,
      avatar: `https://api.dicebear.com/6.x/micah/svg?seed=${avatarSeed}&mouth=laughing,nervous,smile,smirk,surprised&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf&earringsProbability=0&facialHairProbability=0`,
    }));
  }, [avatarSeed]);

  function updatePerson(ev) {
    const { name, value } = ev.target;
    setUpdatedPerson((prevPerson) => ({ ...prevPerson, [name]: value }));
    console.log("ss");
  }

  // Update stateObj with user input. If no input, leave default fetched updatedPerson data.
  function handleSubmit(ev) {
    ev.preventDefault();
    if (ev.target.id === "save") {
      if (!validateForm()) {
        return;
      }
    } else {
      if (confirm("Are you sure you want to delete this updatedPerson?")) {
      } else {
        return;
      }
    }
    // building request (updatedPerson, api-endpoint, method, authenticatedUserToken, navigationPath)
    if (personId) {
      accessDb(
        updatedPerson,
        `https://gift-backend.onrender.com/api/people/${personId}`,
        ev.target.id === "save" ? "PATCH" : "DELETE",
        authenticatedUserToken,
        ev.target.id === "save" ? -1 : -2
      );
    } else {
      accessDb(updatedPerson, `https://gift-backend.onrender.com/api/people/`, "POST", authenticatedUserToken, -1);
    }
  }

  function validateForm() {
    let errors = {};
    let isValid = updatedPerson.fullName && updatedPerson.dob ? true : false;
    const pathname = location.pathname;

    if (!isValid) {
      errors.patchErr = "Full name and date of birth are required.";
      errors.postErr = "Full name and date of birth are required.";
      // switch (pathname) {
      //   case `/people/edit/${pathname.split("/")[3]}`:
      //     errors.patchErr = "You didn't make any changes. Please make changes to save.";
      //     break;
      //   case "/people/add":
      //     errors.postErr = "Full name and date of birth are required.";
      //   default:
      //     break;
      // }

      setFormErrors(errors);
    }
    setFormValid(isValid);
    return isValid;
  }

  //TODO: can make way shorter
  return (
    <motion.main
      className="container"
      initial={{ x: "100%" }}
      animate={{ x: "0" }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.2, ease: "easeIn" }}
    >
      <CheckAuth />

      {updatedPerson._id ? (
        <div>
          <Styled.PersonAddEditTitle>Edit Information for {updatedPerson.fullName}</Styled.PersonAddEditTitle>
          <Styled.PeopleBanner>
            <div style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}>
              <Styled.GiftsBannerAvatar>
                <img
                  className="randomAvatar"
                  src={`https://api.dicebear.com/6.x/micah/svg?seed=${avatarSeed}&mouth=laughing,nervous,smile,smirk,surprised&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf&earringsProbability=0&facialHairProbability=0`}
                ></img>
              </Styled.GiftsBannerAvatar>
              <i
                className="bi bi-shuffle"
                onClick={() => {
                  setAvatarSeed(crypto.randomUUID());
                }}
                style={{ alignSelf: "center", color: "#1E1E1E" }}
              ></i>
            </div>
          </Styled.PeopleBanner>
          <form onSubmit={handleSubmit}>
            {formErrors.patchErr && <span className="error">{formErrors.patchErr}</span>}
            <Styled.FormField>
              <Styled.Label For="name">Full Name</Styled.Label>
              <Styled.TextInput required type="text" id="fullName" name="fullName" defaultValue={updatedPerson.fullName} onChange={updatePerson} />
            </Styled.FormField>
            <Styled.FormField>
              <Styled.Label htmlFor="dob">Date of Birth</Styled.Label>
              <Styled.TextInput
                required
                type="date"
                id="dob"
                name="dob"
                defaultValue={updatedPerson.dob}
                onChange={updatePerson}
                onClick={(ev) => {
                  ev.target.showPicker();
                }}
                style={{ cursor: "pointer" }}
              />
            </Styled.FormField>
            <Styled.ButtonsDiv>
              <Styled.Button type="submit" id="save" onClick={handleSubmit}>
                Save
              </Styled.Button>
              <Styled.Button $secondary type="delete" id="del" onClick={handleSubmit}>
                Delete
              </Styled.Button>
            </Styled.ButtonsDiv>
          </form>
        </div>
      ) : (
        <div>
          <Styled.GiftAddEditH1>Add a new updatedPerson to the list</Styled.GiftAddEditH1>
          <Styled.PeopleBanner>
            <div style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}>
              <Styled.GiftsBannerAvatar>
                <img
                  className="randomAvatar"
                  src={`https://api.dicebear.com/6.x/micah/svg?seed=${avatarSeed}&mouth=laughing,nervous,smile,smirk,surprised&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf&earringsProbability=0&facialHairProbability=0`}
                  alt={`avatar`}
                ></img>
              </Styled.GiftsBannerAvatar>
              <i
                className="bi bi-shuffle"
                onClick={() => {
                  setAvatarSeed(crypto.randomUUID());
                }}
                style={{ alignSelf: "center", color: "#1E1E1E" }}
              ></i>
            </div>
          </Styled.PeopleBanner>
          <form onSubmit={handleSubmit}>
            {formErrors.postErr && <span className="error">{formErrors.postErr}</span>}
            <Styled.FormField>
              <Styled.Label htmlFor="name">Full Name</Styled.Label>
              <Styled.TextInput required type="text" id="fullName" name="fullName" onChange={updatePerson} onClick={updatePerson}/>
            </Styled.FormField>
            <Styled.FormField>
              <Styled.Label htmlFor="dob">Date of Birth</Styled.Label>
              <Styled.TextInput
                required
                type="date"
                id="dob"
                name="dob"
                defaultValue={updatedPerson.dob}
                onChange={updatePerson}
                onClick={(ev) => {
                  ev.target.showPicker();
                }}
                style={{ cursor: "pointer" }}
              />
            </Styled.FormField>
            <Styled.ButtonsDiv>
              <Styled.Button id="save" className="btn save" onClick={handleSubmit}>
                Save
              </Styled.Button>
            </Styled.ButtonsDiv>
          </form>
        </div>
      )}
    </motion.main>
  );
}
