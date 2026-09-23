import { Box, Button, Title } from "@mantine/core";
import React from "react";
import { Link } from "wouter";
interface Props {
  title: string;
  buttonText?: string;
  children?: React.ReactNode;
  href?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

export default function HeaderTitle({
  title,
  buttonText,
  href,
  children,
  onClick,
}: Props) {
  return (
    <Box
      w={"100%"}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "10px 0",
      }}
    >
      <Title>{title}</Title>
      {children ??
        (href ? (
          <Link href={href}>
            <Button>{buttonText}</Button>
          </Link>
        ) : (
          buttonText && <Button onClick={onClick}>{buttonText}</Button>
        ))}
    </Box>
  );
}
