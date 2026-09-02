import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AuthLayout from "./features/auth/components/AuthLayout.jsx";
import LoginPage from "./features/auth/pages/LoginPage.jsx";
import SignupPage from "./features/auth/pages/SignupPage.jsx";
import AddQuestion from "./features/questions/pages/AddQuestion.jsx";
import EditQuestion from "./features/questions/pages/EditQuestion.jsx";
import AllQuestions from "./features/questions/pages/AllQuestions.jsx";
import AddSolution from "./features/discussion/pages/AddSolution.jsx";
import AllSolutions from "./features/discussion/pages/AllSolutions.jsx";
import ReportQuestionPage from "./features/reports/pages/ReportQuesionPage.jsx";
import ProfilePage from "./features/dashboard/pages/ProfilePage.jsx";
import Home from "./pages/Home.jsx";
import QuestionPage from "./features/questions/pages/QuestionPage.jsx";
import DashboardPage from "./features/dashboard/pages/DashboardPage.jsx";
import GoalsPage from "./features/dashboard/pages/GoalsPage.jsx";
import ProgressPage from "./features/dashboard/pages/ProgressPage.jsx";
import StatisticsPage from "./features/dashboard/pages/StatisticsPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <AuthLayout authentication={false}>
            <Home />
          </AuthLayout>
        ),
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <LoginPage />
          </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <SignupPage />
          </AuthLayout>
        ),
      },
      {
        path: "/profile",
        element: (
          <AuthLayout>
            <ProfilePage />
          </AuthLayout>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <AuthLayout>
            <DashboardPage />
          </AuthLayout>
        ),
      },
      {
        path: "/dashboard/progress",
        element: (
          <AuthLayout>
            <ProgressPage />
          </AuthLayout>
        ),
      },
      {
        path: "/dashboard/goals",
        element: (
          <AuthLayout>
            <GoalsPage />
          </AuthLayout>
        ),
      },
      {
        path: "/dashboard/statistics",
        element: (
          <AuthLayout>
            <StatisticsPage />
          </AuthLayout>
        ),
      },
      {
        path: "/all-questions",
        element: (
          <AuthLayout authentication>
            <AllQuestions />
          </AuthLayout>
        ),
      },
      {
        path: "/add-question",
        element: (
          <AuthLayout authentication>
            <AddQuestion />
          </AuthLayout>
        ),
      },
      {
        path: "/questions/:questionId",
        element: (
          <AuthLayout authentication>
            <QuestionPage />
          </AuthLayout>
        ),
      },
      {
        path: "/questions/:id/edit",
        element: (
          <AuthLayout authentication>
            <EditQuestion />
          </AuthLayout>
        ),
      },
      {
        path: "/questions/:questionId/submit-solution",
        element: (
          <AuthLayout authentication>
            <AddSolution />
          </AuthLayout>
        ),
      },
      {
        path: "/questions/:questionId/solutions",
        element: (
          <AuthLayout authentication>
            <AllSolutions />
          </AuthLayout>
        ),
      },
      {
        path: "/questions/:questionId/report",
        element: (
          <AuthLayout authentication>
            <ReportQuestionPage />
          </AuthLayout>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
