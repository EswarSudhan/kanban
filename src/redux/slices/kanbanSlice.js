import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

//////////////////////////////////////////////////////////////////

export const fetchTasksAsync = createAsyncThunk(
  "kanban/fetchTasks",
  async () => {
    try {
      const response = await api.get(
        "/hiring/entryLevel/getCandidateForRecruiter"
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
  }
);

export const fetchInterviewersAsync = createAsyncThunk(
  "kanban/fetchInterviewers",
  async () => {
    try {
      const response = await api.get("/hiring/auth/getListOfInterviewer");
      return response.data;
    } catch (error) {
      console.error("Error fetching interviewers:", error);
      throw error;
    }
  }
);

export const updateTaskAsync = createAsyncThunk(
  "kanban/updateTask",
  async (updatedData) => {
    try {
      const response = await api.put(
        `/hiring/entryLevel/updatedata/${updatedData.resumeId}/`,
        updatedData
      );
      return response.data;
    } catch (error) {
      console.error("Error updating task:", error);
      throw error;
    }
  }
);

const kanbanSlice = createSlice({
  name: "kanban",
  initialState: {
    tasks: {
      Assigned: [],
      Tech: [],
      Waiting: [],
      Selected: [],
    },
    interviewers: [],
    updatedData: [],
    status: "idle",
    error: null,
  },
  reducers: {
    addTask: (state, action) => {
      const { column, task } = action.payload;
      state.tasks[column].push(task);
    },
    UpdatedDataTask: (state, action) => {
      const data = action.payload;
      state.updatedData.push(data);
    },
    moveTask: (state, action) => {
      const { sourceColumn, destinationColumn, sourceIndex, destinationIndex } =
        action.payload;

      if (
        state.tasks[sourceColumn] &&
        state.tasks[destinationColumn] &&
        sourceIndex >= 0 &&
        sourceIndex < state.tasks[sourceColumn].length
      ) {
        const task = state.tasks[sourceColumn].splice(sourceIndex, 1)[0];
        state.tasks[destinationColumn].splice(destinationIndex, 0, task);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasksAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTasksAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        const allTasks = action.payload;

        // Assuming the currentStatus values are strings like "ASSIGNED" and "IN_TECH"
        state.tasks.Assigned = allTasks.filter(
          (task) => task.currentStatus === "ASSIGNED"
        );
        state.tasks.Tech = allTasks.filter(
          (task) => task.currentStatus === "IN_TECH"
        );
        state.tasks.Waiting = allTasks.filter(
          (task) => task.currentStatus === "IN_FINAL"
        );
      })
      .addCase(fetchTasksAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateTaskAsync.pending, (state) => {
        state.status = "updating";
      })
      .addCase(updateTaskAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Update the corresponding task in your state with the new data if needed
      })
      .addCase(updateTaskAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchInterviewersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchInterviewersAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.interviewers = action.payload;
      })
      .addCase(fetchInterviewersAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addTask, moveTask, UpdatedDataTask } = kanbanSlice.actions;
export default kanbanSlice.reducer;
