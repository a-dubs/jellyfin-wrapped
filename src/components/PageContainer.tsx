import { ReactNode } from "react";
import { Box, Button, Flex } from "@radix-ui/themes";
import { useNavigate, useLocation } from "react-router-dom";
import { styled } from "@stitches/react";
import { getNextPage, getPreviousPage } from "@/lib/page-flow";

interface PageContainerProps {
  children: ReactNode;
  backgroundColor?: string;
  nextPage?: string;
  previousPage?: string;
}

const PageContainer = ({
  children,
  backgroundColor = "var(--purple-8)",
  nextPage: nextPageOverride,
  previousPage: previousPageOverride,
}: PageContainerProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Use dynamic navigation if not overridden
  const nextPage = nextPageOverride ?? getNextPage(location.pathname) ?? undefined;
  const previousPage = previousPageOverride ?? getPreviousPage(location.pathname) ?? undefined;

  return (
    <Box style={{ backgroundColor, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ flex: 1, paddingBottom: "5rem" }}>
        {children}
      </div>

      {(nextPage || previousPage) && (
        <NavButtonContainer>
          <Flex gap="2" style={{ width: "100%" }}>
            {previousPage && (
              <Button
                size={"4"}
                color="gray"
                style={{ flex: 1 }}
                onClick={() => {
                  void navigate(previousPage);
                }}
              >
                Previous
              </Button>
            )}
            {nextPage && (
              <Button
                size={"4"}
                style={{ flex: 1 }}
                onClick={() => {
                  void navigate(nextPage);
                }}
              >
                Next
              </Button>
            )}
          </Flex>
        </NavButtonContainer>
      )}
    </Box>
  );
};

const NavButtonContainer = styled("div", {
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 10,
  padding: "0 1rem 1rem 1rem",
});

export default PageContainer;
