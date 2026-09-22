import { Redirect } from "wouter";
import LoadingPage from "../../pages/loading/page";
import { useAuth } from "../../features/auth/auth.context";

type Props = {
  children: React.ReactNode;
};

const allowedRoles = ["ADMIN", "SUPERADMIN"];
export default function ProtectedRoute({ children }: Props) {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingPage />;
  }

  if (!user) {
    return <Redirect to="/login" />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Redirect to="/access-denied" />;
  }

  return children;
}
