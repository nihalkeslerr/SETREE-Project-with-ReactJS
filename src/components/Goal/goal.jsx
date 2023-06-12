import React, { useContext, useState, useEffect, useRef } from "react";
import tickIcon from "../ASSETS/icons/tick.png";
import axios from "axios";
import plusIcon from "../ASSETS/icons/plusIcon.png";
import { GlobalContext } from "../Context/GlobalContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

function Goal() {
  const {
    token,
    API_URL,
    ID,
    personalID,
    setPersonalID,
    getColor,
    getOpenColor,
    goals,
    setGoals,
    fetchGoals,
    toggleGoalItems,
    Goalisloading,
  } = useContext(GlobalContext);
  const dataFetchedRef = useRef(false);
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState(null);
  const [item, setItem] = useState(null);
  const [updatedContent, setUpdatedContent] = useState("");

  const [checked, setChecked] = useState(false);
  console.log("checked: ", checked);
  const [createisloading, setCreateisloading] = useState(false);

  useEffect(() => {
    if (!dataFetchedRef.current) {
      fetchGoals();
      dataFetchedRef.current = true;
    }
  }, [goals]);

  const toggleCreating = () => {
    setIsCreating((prevIsCreating) => !prevIsCreating);
  };

  const handleCreateGoal = (e) => {
    e.preventDefault();
    setCreateisloading(true);
    axios
      .post(
        `${API_URL}/createGoal`,
        { title },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        if (response.data.succeded === true) {
          toast.success("Goal Successfully Created!");
        } else {
          toast.error(response.data.error);
        }
        fetchGoals();
      })
      .catch((error) => {
        console.error(error);
        toast.error("Connected Error");
      })
      .finally(() => {
        setCreateisloading(false);
      })
    document.getElementsByClassName("titleGoal").value = " ";
  };

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
    console.log("title", title);
  };

  const onsubmit = (e, goalId, content) => {
    e.preventDefault();

    const newItem = {
      content: content,
      goalId: goalId,
    };

    axios
      .post(`${API_URL}/createGoalItem`, newItem, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Yeni hedef öğesi başarıyla oluşturuldu:", response);
        const updatedGoals = goals.map((goal, id) => {
          if (goal.id === goalId) {
            return {
              ...goal,
              goalItems: [
                ...goal.goalItems,
                { id: response.data.id, content: content, isDone: false },
              ],
            };
          } else {
            return goal;
          }
        });

        setGoals(updatedGoals);
        setItem(null);
      })
      .catch((error) => {
        console.error("Hedef öğesi oluşturulurken bir hata oluştu:", error);
      });
  };

  const deleteItem = (goalId, itemId) => {
    axios
      .get(`${API_URL}/deleteGoalItem/${itemId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Hedef öğesi başarıyla silindi:", response);

        const updatedGoals = goals.map((goal) => {
          if (goal.id === goalId) {
            return {
              ...goal,
              goalItems: goal.goalItems.filter((item) => item.id !== itemId),
            };
          } else {
            return goal;
          }
        });

        setGoals(updatedGoals);
      })
      .catch((error) => {
        console.error("Hedef öğesi silinirken bir hata oluştu:", error);
      });
  };

  const toggleChecked = (goalId, itemId) => {
    // Hedef öğesinin `isDone` özelliğini tersine çevir
    const updatedGoals = goals.map((goal) => {
      if (goal.id === goalId) {
        const updatedGoalItems = goal.goalItems.map((item) => {
          if (item.id === itemId) {
            const updatedItem = {
              ...item,
              isDone: !item.isDone,
            };
            console.log("updatedItem:", updatedItem);
            // Veritabanında güncelleme yapmak için API'yi çağır
            axios
              .post(`${API_URL}/updateGoalItem/`, updatedItem, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
              .then((response) => {
                console.log("Hedef öğesi başarıyla güncellendi:", response);
              })
              .catch((error) => {
                console.error(
                  "Hedef öğesi güncellenirken bir hata oluştu:",
                  error
                );
              });

            return updatedItem;
          } else {
            return item;
          }
        });
        return {
          ...goal,
          goalItems: updatedGoalItems,
        };
      } else {
        return goal;
      }
    });

    setGoals(updatedGoals);
  };

  console.log("goals: ", goals);
  return (
    <div>
      <div className="createGoal">
        <button onClick={toggleCreating}>
          NEW GOAL
          <img src={plusIcon} alt="" />
        </button>

        {isCreating && (
          <div className="CreatingPart">
            <label htmlFor="titleGoal"></label>
            <input
              className="titleGoal"
              onChange={onChangeTitle}
              name="titleGoal"
              type="text"
              placeholder="Title"
            />
            <input
              type="button"
              className="buttonGoal"
              value="Create"
              onClick={handleCreateGoal}
            />
            {createisloading && (
          <Stack spacing={2} direction="row">
            <CircularProgress sx={{ color: "#596ed3" }} size={20} />
          </Stack>
      )}
      
       
          </div>
        )}
      </div>
      {Goalisloading && (
        <div className="loading">
          <Stack spacing={2} direction="row">
            <CircularProgress sx={{ color: "#596ed3" }} size={100} />
          </Stack>
        </div>
      )}
      <div className="goal">
        {goals &&
          goals.map((goal, index) => (
            <div
              className="target"
              key={goal.id}
              style={{
                boxShadow: `11px 6px ${getColor(index)}`,
                backgroundColor: `${getOpenColor(index)}`,
                border: `1px solid ${getColor(index)}`,
              }}
            >
              {goal.goalItems
                .slice(0, goal.showAllItems ? undefined : 4)
                .map((item) => (
                  <label className="containerTarget" key={item.id}>
                    <input
                      className="checkBoxes"
                      type="checkbox"
                      checked={item.isDone}
                      onChange={() => toggleChecked(goal.id, item.id)}
                    />
                    <span
                      className="checkmark"
                      style={{
                        border: `1.5px solid ${getColor(index)}`,
                        backgroundColor: item.isDone
                          ? getColor(index)
                          : getOpenColor(index),
                      }}
                    >
                      <img src={tickIcon} alt="tick" />
                    </span>
                    <label htmlFor="matter" className="matter">
                      <input
                        className="contentInpt"
                        value={item.content}
                        onChange={(e) =>
                          setItem({ ...item, content: e.target.value })
                        }
                      />
                    </label>
                    <button
                      className="DeleteItem"
                      onClick={() => deleteItem(goal.id, item.id)}
                    ></button>
                  </label>
                ))}

              <form onSubmit={(e) => onsubmit(e, goal.id, item)}>
                <input
                  type="text"
                  onChange={(e) => setItem(e.target.value)}
                  className="AddItem"
                  placeholder="+ Add Item"
                />
              </form>

              <label
                className="show"
                htmlFor=""
                onClick={() => toggleGoalItems(goal.id)}
              >
                {goal.showAllItems ? " ︿" : "  ﹀"}
              </label>
              <div
                className="title"
                style={{ backgroundColor: `${getColor(index)}` }}
              >
                <label>{goal.title}</label>
                <div
                  className="goalcount"
                  style={{
                    backgroundColor: `${getColor(index)}`,
                    border: `2px solid ${getOpenColor(index)}`,
                  }}
                >
                  <label>{goal.goalItems ? goal.goalItems.length : 0}</label>
                </div>
              </div>
            </div>
          ))}
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default Goal;
