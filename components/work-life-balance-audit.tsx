// Find the copy button section in work-life-balance-audit.tsx and replace it with this improved version:

<div className="space-y-2 w-full">
  <div className="bg-white p-4 rounded-md border-2 border-[#E26C73] shadow-md">
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 gap-2">
      <label className="text-base font-bold text-[#E26C73]">Your Results for Cherry Blossom:</label>
      <Button
        onClick={copyCherryBlossomPrompt}
        variant="outline"
        className={`${
          isCherryPromptCopied ? "bg-green-500" : "bg-[#5D9D61]"
        } hover:bg-[#4c8050] text-white w-full sm:w-auto transition-all duration-300`}
        size="sm"
      >
        {isCherryPromptCopied ? (
          <>
            <Check className="mr-1 h-4 w-4 animate-bounce" />
            Copied!
          </>
        ) : (
          <>
            <Copy className="mr-1 h-4 w-4" />
            Copy
          </>
        )}
      </Button>
    </div>
    <div className="relative w-full">
      <textarea
        ref={cherryBlossomPromptRef}
        className={`w-full h-40 p-3 text-base bg-gray-50 text-gray-800 border rounded-md font-medium resize-none focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 ${
          isCherryPromptCopied ? "border-green-500 focus:ring-green-500" : "border-gray-300 focus:ring-[#E26C73]"
        }`}
        value={generateCherryBlossomPrompt()}
        readOnly
        onClick={(e) => e.currentTarget.select()}
      />
      {!isCherryPromptCopied && (
        <div className="absolute top-2 right-2 bg-white/80 px-2 py-1 rounded text-xs text-gray-600 pointer-events-none">
          Click to select all
        </div>
      )}
      {isCherryPromptCopied && (
        <div className="absolute top-2 right-2 bg-green-100 px-2 py-1 rounded text-xs text-green-700 font-medium animate-pulse">
          Copied to clipboard!
        </div>
      )}
    </div>
  </div>

  <Button
    onClick={copyCherryBlossomPrompt}
    className={`w-full ${
      isCherryPromptCopied ? "bg-green-500" : "bg-[#5D9D61]"
    } hover:bg-[#4c8050] text-white py-3 text-base font-bold transition-all duration-300`}
  >
    {isCherryPromptCopied ? (
      <>
        <Check className="mr-2 h-5 w-5 animate-bounce" />
        Copied Successfully!
      </>
    ) : (
      <>
        <Copy className="mr-2 h-5 w-5" />
        Copy Your Results For Cherry Blossom
      </>
    )}
  </Button>
</div>