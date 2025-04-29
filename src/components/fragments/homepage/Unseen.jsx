import { Button } from "@/components/ui/button";
import React from "react";

function UnseenPage() {
  return (
    <div className="mt-[100px] flex justify-between items-center max-w-6xl mx-auto px-4 md:px-0">
      <img src="/assets/content1.png" alt="" className="w-[441px]" />
      <div className="flex flex-col gap-4 w-[601px] items-start">
        <h1 className="text-4xl font-bold text-abu">
          The unseen of spending three years at Pixelgrade
        </h1>
        <p className="text-base text-gray-500">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet
          justo ipsum. Sed accumsan quam vitae est varius fringilla.
          Pellentesque placerat vestibulum lorem sed porta. Nullam mattis
          tristique iaculis. Nullam pulvinar sit amet risus pretium auctor.
          Etiam quis massa pulvinar, aliquam quam vitae, tempus sem. Donec
          elementum pulvinar odio.
        </p>
        <Button>Learn More</Button>
      </div>
    </div>
  );
}

export default UnseenPage;
