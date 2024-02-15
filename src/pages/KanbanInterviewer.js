import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  moveTask,
  fetchTasksAsync,
  updateTaskAsync,
  fetchInterviewerDataByIdAsync,
} from "../redux/slices/interviewerSlice";
import "../pages/kanban.css";
import { useNavigate } from "react-router-dom";
import { logoutAction } from "../redux/slices/authSlice";
import { Button, Modal, Form, Input, Rate, Select, Divider } from "antd";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { PlusOutlined } from "@ant-design/icons";

////////////////////////////////////////////////////////////////////////////////////////////

export default function KanbanInterviewer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tasks = useSelector((state) => state.interviewer.tasks);
  const interData = useSelector((state) => state.interviewer.interViewerData);
  console.log("Data", interData);
  const [selectedTasks, setSelectedTasks] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [interViewerId, setInterViewerId] = useState("");
  const [interViewerData, setInterViewerData] = useState([]);

  useEffect(() => {
    dispatch(fetchTasksAsync());
    // dispatch(fetchInterviewerDataByIdAsync());
  }, [dispatch]);

  const handleDrop = (result) => {
    const { source, destination } = result;

    if (
      !destination ||
      (source.droppableId === destination.droppableId &&
        source.index === destination.index)
    ) {
      return;
    }

    dispatch(
      moveTask({
        sourceColumn: source.droppableId,
        destinationColumn: destination.droppableId,
        sourceIndex: source.index,
        destinationIndex: destination.index,
      })
    );
    const updatedTask = tasks[source.droppableId][source.index];
    console.log("updated task", updatedTask);

    if (source.droppableId !== destination.droppableId) {
      dispatch(
        updateTaskAsync({ ...interViewerData, submissionStatus: "SUBMITTED" })
      );
    }
  };

  const handleCardClick = async (task) => {
    try {
      // Fetch data for the selected resumeId
      const response = await dispatch(
        fetchInterviewerDataByIdAsync(task.resumeId)
      );
      const data = response.payload;
      setInterViewerData(data);
      console.log("InterViewerData", data);
      console.log("id", response.payload.id);
      setInterViewerId(response.payload.id);
      // Update selectedTasks state with fetched data
      setSelectedTasks({ [task.resumeId]: { ...task, ...data } });
      setIsModalVisible(true);
    } catch (error) {
      console.error("Error fetching interviewer data by ID:", error);
      // Handle error as needed
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setSelectedTasks({});
  };

  const handleModalSubmit = (updatedData) => {
    const updatedTask = {
      ...updatedData.values,
      submissionStatus: "SAVED",
      candidateName: updatedData.values.name,
      id: interViewerId, // Rename 'name' to 'candidateName'
    };
    delete updatedTask.name; // Remove 'name'
    dispatch(updateTaskAsync(updatedTask));
    setIsModalVisible(false);
    setSelectedTasks({});
  };

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logoutAction());
    navigate("/", { replace: true });
  };

  return (
    <>
      <DragDropContext onDragEnd={handleDrop}>
        <div className="kanban-board">
          {Object.keys(tasks).map((column) => (
            <Droppable key={column} droppableId={column}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="column"
                >
                  <h2>{column.toUpperCase()}</h2>
                  <ul>
                    {tasks[column].map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id.toString()}
                        index={index}
                        // isDragDisabled={task.submissionStatus !== "SAVED"}
                      >
                        {(provided) => (
                          <li
                            onClick={() => handleCardClick(task)}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              ...provided.draggableProps.style,
                              cursor: "pointer",
                            }}
                          >
                            <div className="card-header">
                              {" "}
                              <i
                                className="fas fa-user-circle"
                                style={{ marginRight: "5px" }}
                              ></i>
                              {task.name}
                            </div>
                            <div className="card-details">{task.jobRole}</div>
                            <div className="card-mark">
                              Score: {task.resumeScore}
                            </div>
                          </li>
                        )}
                      </Draggable>
                    ))}
                  </ul>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      <Modal
        title={`Edit Candidate Details - ${selectedTasks.name}`}
        visible={isModalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
        {selectedTasks &&
          Object.values(selectedTasks).map((selectedTask) => (
            <Form
              key={selectedTask.id}
              onFinish={(values) => handleModalSubmit({ values })}
              initialValues={selectedTask}
            >
              {" "}
              {/* <Form.Item label="ID" name="id">
                <Input disabled />
              </Form.Item> */}
              <Form.Item label="Candidate Name" name="name">
                <Input />
              </Form.Item>
              <Form.Item label="Resume ID" name="resumeId">
                <Input />
              </Form.Item>
              <Form.Item label="Strength" name="strength">
                <Input />
              </Form.Item>
              <Form.Item label="Weakness" name="weakness">
                <Input />
              </Form.Item>
              <Form.Item label="Shortlist Status" name="shortlistStatus">
                <Input />
              </Form.Item>
              <Form.Item label="Overall Comments" name="overall_comments">
                <Input.TextArea />
              </Form.Item>
              <Form.Item label="Overall Rating" name="overall_rating">
                <Rate />
              </Form.Item>
              <Form.Item label="Remarks" name="remarks">
                <Input />
              </Form.Item>
              <Divider>Skills</Divider>
              <Form.List name="skills">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, fieldKey, ...restField }) => (
                      <div key={key} style={{ marginBottom: "16px" }}>
                        <Form.Item
                          label={`Skill ${key + 1}`}
                          {...restField}
                          name={[name, "skills"]}
                          fieldKey={[fieldKey, "skills"]}
                        >
                          <Input placeholder="Skill" />
                        </Form.Item>
                        <Form.Item
                          label={`Proficiency ${key + 1}`}
                          {...restField}
                          name={[name, "proficiency"]}
                          fieldKey={[fieldKey, "proficiency"]}
                        >
                          <Input placeholder="Proficiency" />
                        </Form.Item>
                        <Form.Item
                          label={`Rating out of 10 ${key + 1}`}
                          {...restField}
                          name={[name, "ratingoutof10"]}
                          fieldKey={[fieldKey, "ratingoutof10"]}
                        >
                          <Input
                            placeholder="Rating out of 10"
                            type="number"
                            min={0}
                            max={10}
                          />
                        </Form.Item>
                        <Form.Item
                          label={`Comments ${key + 1}`}
                          {...restField}
                          name={[name, "comments"]}
                          fieldKey={[fieldKey, "comments"]}
                        >
                          <Input.TextArea placeholder="Comments" />
                        </Form.Item>
                        <Button
                          type="dashed"
                          onClick={() => remove(name)}
                          style={{ width: "100%" }}
                        >
                          Remove Skill
                        </Button>
                      </div>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        icon={<PlusOutlined />}
                      >
                        Add Skill
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  SAVE
                </Button>
              </Form.Item>
            </Form>
          ))}
      </Modal>

      <Button onClick={handleLogout}>LOGOUT</Button>
    </>
  );
}