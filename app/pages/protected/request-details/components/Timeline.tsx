import Stepper from "@keyvaluesystems/react-stepper";

const Timeline = () => {
  const styles = {
    LineSeparator: () => ({
      backgroundColor: "#5fbcff",
    }),
    ActiveNode: () => ({
      backgroundColor: "#5fbcff",
    }),
    CompletedNode: () => ({
      backgroundColor: "#028A0F",
    }),
  };
  return (
    <Stepper
      steps={[
        {
          stepLabel: "Step 1",
          stepDescription: "This is Step 1",
          completed: true,
        },
        {
          stepLabel: "Step 2",
          stepDescription: "This is Step 2",
          completed: false,
        },
        {
          stepLabel: "Step 3",
          stepDescription: "This is Step 3",
          completed: false,
        },
      ]}
      currentStepIndex={1}
      orientation="horizontal"
      labelPosition="bottom"
      styles={styles}
      showDescriptionsForAllSteps
    />
  );
};

export default Timeline;
