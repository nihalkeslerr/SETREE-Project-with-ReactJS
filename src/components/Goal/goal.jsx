import React, { useContext, useState, useEffect, useRef } from "react";
import tickIcon from "../ASSETS/icons/tick.png";
import axios from "axios";
import { GlobalContext } from "../Context/GlobalContext";
function Goal() {
  const { token, API_URL, ID, personalID, setPersonalID, getRandomRenk } =
    useContext(GlobalContext);
  const dataFetchedRef = useRef(false);

  const [goals, setGoals] = useState([]);

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    fetchGoals();
  }, []);

  const fetchGoals = () => {
    axios
      .get("https://setree.onrender.com/getGoals", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const fetchedGoals = response.data.goals;
        console.log("goallar çekildi:", fetchedGoals);

        // Her bir goal için getGoalDetail() fonksiyonunu çağır
        fetchedGoals.forEach((goal) => {
          getGoalDetail(goal.id);
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getGoalDetail = (id) => {
    axios
      .get(`https://setree.onrender.com/getGoalDetail/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("goalitem: ", response.data.goal);
        // Burada goal detail verilerini işleyebilirsiniz
        const goalItemData = response.data.goal;
        // goals dizisini güncelle
        setGoals((prevGoals) => [...prevGoals, goalItemData]);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  console.log("goals: ", goals);
  return (
    <div className="goal">
      {goals &&
        goals.map((goal) => (
          <div className="target" key={goal.id}>
            {goal.goalItems.map((item) => (
              <label className="containerTarget" key={item.id}>
                <input type="checkbox" />
                <span className="checkmark">
                  <img src={tickIcon} alt="tick" />
                </span>
                <label htmlFor="matter" className="matter">
                  {item.content}
                </label>
              </label>
            ))}
            <label htmlFor="">Add GoalItem</label>
            <div className="title">
              <label>{goal.title}</label>
              <div className="goalcount">
                <label>{goal.goalItems ? goal.goalItems.length : 0}</label>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Goal;
