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
import EditSolution from "./features/discussion/pages/EditSolution.jsx";
import AllSolutions from "./features/discussion/pages/AllSolutions.jsx";
import ReportQuestionPage from "./features/reports/pages/ReportQuesionPage.jsx";
import ProfilePage from "./features/dashboard/pages/ProfilePage.jsx";
import QuestionPage from "./features/questions/pages/QuestionPage.jsx";
import DashboardPage from "./features/dashboard/pages/DashboardPage.jsx";
import GoalsPage from "./features/dashboard/pages/GoalsPage.jsx";
import ProgressPage from "./features/dashboard/pages/ProgressPage.jsx";
import StatisticsPage from "./features/dashboard/pages/StatisticsPage.jsx";
import VerificationEmailSent from "./features/auth/pages/VerificationEmailSent.jsx";
import ForgotPassword from "./features/auth/pages/ForgetPassword.jsx";
import ResetPassword from "./features/auth/pages/ResetPassword.jsx";
import ChangePassword from "./features/auth/pages/ChangePassword.jsx";
import ModerationDashboard from "./features/moderation/pages/ModerationDashboard.jsx";
import ReportDetail from "./features/moderation/components/ReportDetail.jsx";
import IsVerified from "./features/auth/components/IsVerified.jsx";
import Home from "./pages/Home.jsx";

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
            <IsVerified>
              <DashboardPage />
            </IsVerified>
          </AuthLayout>
        ),
      },
      {
        path: "/dashboard/progress",
        element: (
          <AuthLayout>
            <IsVerified>
              <ProgressPage />
            </IsVerified>
          </AuthLayout>
        ),
      },
      {
        path: "/dashboard/goals",
        element: (
          <AuthLayout>
            <IsVerified>
              <GoalsPage />
            </IsVerified>
          </AuthLayout>
        ),
      },
      {
        path: "/dashboard/statistics",
        element: (
          <AuthLayout>
            <IsVerified>
              <StatisticsPage />
            </IsVerified>
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
            <IsVerified>
              <AddQuestion />
            </IsVerified>
          </AuthLayout>
        ),
      },
      {
        path: "/questions/:questionId",
        element: (
          <AuthLayout authentication>
            <IsVerified>
              <QuestionPage />
            </IsVerified>
          </AuthLayout>
        ),
      },
      {
        path: "/questions/:id/edit",
        element: (
          <AuthLayout authentication>
            <IsVerified>
              <EditQuestion />
            </IsVerified>
          </AuthLayout>
        ),
      },
      {
        path: "/questions/:questionId/submit-solution",
        element: (
          <AuthLayout authentication>
            <IsVerified>
               <AddSolution />
            </IsVerified>
          </AuthLayout>
        ),
      },
      {
        path: "/questions/:questionId/solutions/:solutionId/edit",
        element: (
          <AuthLayout authentication>
            <IsVerified>
               <EditSolution/>
            </IsVerified>
          </AuthLayout>
        ),
      },
      {
        path: "/questions/:questionId/solutions",
        element: (
          <AuthLayout authentication>
            <IsVerified>
              <AllSolutions />
            </IsVerified>
          </AuthLayout>
        ),
      },
      {
        path: "/questions/:questionId/report",
        element: (
          <AuthLayout authentication>
            <IsVerified>
               <ReportQuestionPage />
            </IsVerified>
          </AuthLayout>
        ),
      },
      {
        path: "/verification-email-sent",
        element: <VerificationEmailSent />,
      },
      {
        path: "/forgot-password",
        element: (
            <ForgotPassword />
        ),
      },
      {
        path: "/reset-password/:token",
        element: <ResetPassword />,
      },
      {
        path: "/change-password",
        element: (
          <AuthLayout authentication>
            <ChangePassword />
          </AuthLayout>
        ),
      },
      {
        path: "/moderation",
        element: (
          <AuthLayout>
            <IsVerified>
               <ModerationDashboard/>
            </IsVerified>
          </AuthLayout>
        )
      },
      {
        path: "/moderation/reports/:id",
        element: (
          <AuthLayout>
            <IsVerified>
              <ReportDetail/>
            </IsVerified>
          </AuthLayout>
        )
      }
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
