import {
  Button,
  Checkbox,
  Container,
  Group,
  Paper,
  PasswordInput,
  TextInput,
  Title,
} from "@mantine/core";
import classes from "./AuthenticationTitle.module.css";
import { useForm } from "@mantine/form";
import { useAuth } from "../../features/auth/auth.context";

export default function LoginPage() {
  const { user, login, mutationPending } = useAuth();
  const form = useForm({
    initialValues: {
      login: "",
      password: "",
      remember: true,
    },
    validate: {
      password: (val) =>
        val.length < 4 ? "Parol kamida 4 belgi bo'ladi" : null,
      login: (val) =>
        val.length < 4 ? "Username kamida 4 belgi bo'ladi" : null,
    },
  });
  return (
    <form onSubmit={form.onSubmit((values) => login(values))}>
      <Container size={420} my={40}>
        <Title ta="center" className={classes.title}>
          Xush kelibsiz!
        </Title>

        <Paper withBorder shadow="sm" p={22} mt={30} radius="md">
          <TextInput
            disabled={mutationPending}
            label="Username"
            placeholder="username"
            radius="md"
            key={form.key("login")}
            {...form.getInputProps("login")}
          />
          <PasswordInput
            disabled={mutationPending}
            label="Parol"
            placeholder="********"
            mt="md"
            radius="md"
            key={form.key("password")}
            {...form.getInputProps("password")}
          />
          <Group justify="space-between" mt="lg">
            <Checkbox
              disabled={mutationPending}
              key={form.key("remember")}
              {...form.getInputProps("remember", { type: "checkbox" })}
              label="Meni eslab qol"
            />
          </Group>
          <Button
            disabled={mutationPending}
            type="submit"
            fullWidth
            mt="xl"
            radius="md"
            loading={mutationPending}
          >
            Kirish
          </Button>
        </Paper>
      </Container>
    </form>
  );
}
