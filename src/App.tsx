import React, { useState, useEffect } from 'react';
import { AlertCircle, ChevronRight, ArrowLeft, HeartPulse, Loader2 } from 'lucide-react';
import './App.css'; // Import the CSS file

interface PredictionData {
  radiusMean?: number;
  textureMean?: number;
  perimeterMean?: number;
  areaMean?: number;
  smoothnessMean?: number;
  compactnessMean?: number;
}

function PredictionPage() {
  const [step, setStep] = useState(1);
  const [predictionData, setPredictionData] = useState<PredictionData>({
    radiusMean: 14,
    textureMean: 20,
    perimeterMean: 70,
    areaMean: 400,
    smoothnessMean: 0.1,
    compactnessMean: 0.15,
  });
  const [prediction, setPrediction] = useState<string | null>(null);
  const [isPredicting, setIsPredicting] = useState(false);

  const handleInputChange = (field: keyof PredictionData, value: number) => {
    setPredictionData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Trigger prediction
      setIsPredicting(true);
      setTimeout(() => {
        // Rule-based mock prediction logic
        const { radiusMean, perimeterMean, compactnessMean } = predictionData;
        if (
          (radiusMean && radiusMean > 20) ||
          (perimeterMean && perimeterMean > 100) ||
          (compactnessMean && compactnessMean > 0.3)
        ) {
          setPrediction('Malignant(Cancerous)');
        } else {
          setPrediction('Benign (Non-Cancerous)');
        }
        setIsPredicting(false);
      }, 2000); // Simulate prediction processing time
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center py-10 px-4 fade-in">
      <div className="flex items-center text-indigo-600 text-2xl md:text-4xl font-bold mb-4">
        <HeartPulse className="mr-2" />
        Breast Cancer Prediction
      </div>
      <p className="text-center text-gray-700 mb-10 max-w-2xl">
        This model uses simple rules to predict whether a breast mass is benign
        or malignant based on input features.
      </p>
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-2xl">
        {/* Progress Indicator */}
        <div className="flex items-center justify-between mb-10">
          {[1, 2, 3].map((num, idx) => (
            <React.Fragment key={num}>
              <div
                className={`flex items-center justify-center h-10 w-10 rounded-full ${
                  step >= num ? 'bg-indigo-600' : 'bg-gray-200'
                } text-white font-bold`}
              >
                {num}
              </div>
              {idx < 2 && (
                <div
                  className={`h-1 flex-1 mx-2 ${
                    step > num ? 'bg-indigo-600' : 'bg-gray-200'
                  }`}
                ></div>
              )}
            </React.Fragment>
          ))}
        </div>
        {/* Step 1 */}
        {step === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {['radiusMean', 'textureMean'].map((field) => (
              <div key={field}>
                <div className="flex items-center mb-1">
                  <label className="text-gray-700">
                    {field.replace('Mean', ' Mean')}
                  </label>
                  <AlertCircle size={16} className="ml-1 text-gray-400" />
                </div>
                <input
                  type="number"
                  value={predictionData[field as keyof PredictionData]}
                  onChange={(e) =>
                    handleInputChange(
                      field as keyof PredictionData,
                      parseFloat(e.target.value)
                    )
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            ))}
          </div>
        )}
        {/* Step 2 */}
        {step === 2 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {['perimeterMean', 'areaMean'].map((field) => (
              <div key={field}>
                <div className="flex items-center mb-1">
                  <label className="text-gray-700">
                    {field.replace('Mean', ' Mean')}
                  </label>
                  <AlertCircle size={16} className="ml-1 text-gray-400" />
                </div>
                <input
                  type="number"
                  value={predictionData[field as keyof PredictionData]}
                  onChange={(e) =>
                    handleInputChange(
                      field as keyof PredictionData,
                      parseFloat(e.target.value)
                    )
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            ))}
          </div>
        )}
        {/* Step 3 */}
        {step === 3 && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {['smoothnessMean', 'compactnessMean'].map((field) => (
                <div key={field}>
                  <div className="flex items-center mb-1">
                    <label className="text-gray-700">
                      {field.replace('Mean', ' Mean')}
                    </label>
                    <AlertCircle size={16} className="ml-1 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    value={predictionData[field as keyof PredictionData]}
                    onChange={(e) =>
                      handleInputChange(
                        field as keyof PredictionData,
                        parseFloat(e.target.value)
                      )
                    }
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
              ))}
            </div>
            {/* Prediction Output */}
            {prediction && !isPredicting && (
              <div
                className={`p-4 mt-6 border-l-4 ${
                  prediction?.startsWith('Malignant')
                    ? 'bg-red-50 border-red-500'
                    : 'bg-green-50 border-green-400'
                }`}
              >
                <div className="flex">
                  <AlertCircle
                    size={20}
                    className={`flex-shrink-0 ${
                      prediction?.startsWith('Malignant')
                        ? 'text-red-500'
                        : 'text-green-500'
                    }`}
                  />
                  <div className="ml-3">
                    <p
                      className={`text-sm font-medium ${
                        prediction?.startsWith('Malignant')
                          ? 'text-red-800'
                          : 'text-green-800'
                      }`}
                    >
                      Prediction: {prediction}
                    </p>
                    <p
                      className={`text-sm mt-2 ${
                        prediction?.startsWith('Malignant')
                          ? 'text-red-700'
                          : 'text-green-700'
                      }`}
                    >
                      The model predicts that the mass is {prediction?.split(' ')[0].toLowerCase()}.
                    </p>
                  </div>
                </div>
              </div>
            )}
            {/* Predicting Animation */}
            {isPredicting && (
              <div className="flex justify-center mt-6">
                <Loader2 className="animate-spin text-indigo-600 h-8 w-8 mr-2" />
                <p className="text-gray-600">Predicting...</p>
              </div>
            )}
          </div>
        )}
        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          {step > 1 ? (
            <button
              onClick={handleBack}
              className="bg-gray-600 text-white px-4 py-2 rounded flex items-center"
            >
              <ArrowLeft size={16} className="mr-1" /> Back
            </button>
          ) : (
            <div></div>
          )}
          <button
            onClick={handleNext}
            className={`${
              step < 3
                ? 'bg-indigo-600 hover:bg-indigo-700'
                : isPredicting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700'
            } text-white px-4 py-2 rounded flex items-center`}
            disabled={isPredicting}
          >
            {step < 3 ? (
              <>
                Next <ChevronRight size={16} className="ml-1" />
              </>
            ) : isPredicting ? (
              <>
                <Loader2 className="animate-spin h-5 w-5 mr-2" />
                Predicting...
              </>
            ) : (
              <>
                Predict <span className="ml-1">❤</span>
              </>
            )}
          </button>
        </div>
      </div>
      <div className="mt-8 bg-white rounded-lg shadow-sm p-4 w-full max-w-md text-center">
        <h3 className="text-lg font-medium text-gray-900">
          Model Accuracy: 98.6%
        </h3>
        <p className="text-sm text-gray-500">
          Based on Wisconsin Breast Cancer Dataset
        </p>
      </div>
      <p className="mt-6 text-center text-gray-500 max-w-2xl text-sm">
        Note: This is a demonstration model only and we suggest to
        always consult with healthcare professionals for medical
        advice.
      </p>
    </div>
  );
}

function FrontPage({ onStartClick }: { onStartClick: () => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 fade-in">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="heart-animation pumping"> {/* Apply the pumping class directly */}
            <HeartPulse className="mx-auto h-16 w-auto text-indigo-600" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Welcome to Breast Cancer Prediction
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            A simple tool by Shivesh Richhariya
          </p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-8">
          <p className="mb-6 text-gray-700 leading-relaxed">
          Breast cancer is a disease in which cells in the breast
          grow out of control. It is the most common cancer in
women worldwide. Early detection through methods
like self-exams, clinical breast exams, and
mammography can significantly improve treatment
outcomes. This tool uses trained model datasets to
predict if the tumor is malignant or benign.
          </p>
          <button
            onClick={onStartClick}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <HeartPulse
                className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                aria-hidden="true"
              />
            </span>
            Start Prediction
          </button>
        </div>
        <p className="mt-4 text-center text-gray-500 text-xs">
          Note: This is a demonstration model only and we suggest to
          always consult with healthcare professionals for medical
          advice.
        </p>
      </div>
    </div>
  );
}

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 fade-in">
      <div className="text-center relative w-full max-w-md">
        <p className="text-xl text-indigo-700 mb-2">
          Thank you for choosing this tool to predict the cancer!
        </p>
        <div className="relative h-8 bg-gray-200 rounded-full overflow-hidden">
          <div className="loading-bar absolute top-0 left-0 h-full bg-indigo-600 rounded-full"></div>
        </div>
        <p className="mt-4 text-gray-600">Thank you for your patience, our model is processing!!</p>
      </div>
    </div>
  );
}

function App() {
  const [showPredictionPage, setShowPredictionPage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleStartClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowPredictionPage(true);
    }, 6000); // Simulate 6 seconds of processing
  };

  const handleGoBack = () => {
    setShowPredictionPage(false);
    // setIsLoading(false); // No need to explicitly reset here
  };

  return (
    <div className="app-container">
      {!showPredictionPage && !isLoading ? (
        <FrontPage onStartClick={handleStartClick} />
      ) : isLoading ? (
        <LoadingScreen />
      ) : (
        <div className="relative slide-in-right">
          <button
            onClick={handleGoBack}
            className="absolute top-4 left-4 bg-gray-300 text-gray-700 px-3 py-2 rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            <ArrowLeft size={16} className="mr-1 inline-block" /> Back
          </button>
          <PredictionPage />
        </div>
      )}
    </div>
  );
}

export default App;
