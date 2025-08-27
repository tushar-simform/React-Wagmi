import Dashboard from "../components/Dashboard";
import Transfer from "../components/Transfer";
import Voting from "../components/Voting";
import RootLayout from "../layouts/RootLayout";
export const routes = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/transfer-assets",
        element: <Transfer />,
      },
      {
        path: "/voting",
        element: <Voting />,
      },
    ],
  },
];
