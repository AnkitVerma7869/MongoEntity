'use client';
import { useState, useEffect } from "react";
import { Toaster } from 'react-hot-toast';
import { Attribute, Entity, ConfigData } from "../../interfaces/types";
import { initialAttributeState, fetchEntityConfig, saveEntity} from "../../utils/utilstableform";
import { showToast } from "../../utils/toast";
import EntitySetup from "./EntitySetup";
import EntityPreview from "./EntityPreview";
import EntityRoutes from "./EntityRoutes";
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

// Loading component shown while fetching initial data
const LoadingState = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-lg">Loading...</div>
  </div>
);

// Add FullPageLoader component
const FullPageLoader = () => (
  <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
    <div className="bg-white rounded-lg p-8 flex flex-col items-center space-y-3 shadow-lg">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p className="text-primary font-medium">Saving Entity...</p>
    </div>
  </div>
);

interface TableFormProps {
  token: string;
}

export default function TableForm({ token }: TableFormProps) {
  // Configuration state
  const [loading, setLoading] = useState(true);
  const [configData, setConfigData] = useState<ConfigData>({
    entities: {},
    dataTypes: [],
    validations: [],
    inputTypes: {}
  });

  // Form state management
  const [entityName, setEntityName] = useState("");
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [currentAttribute, setCurrentAttribute] = useState<Attribute>(initialAttributeState);
  const [isCustomEntity, setIsCustomEntity] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();
  // Load initial configuration data
  useEffect(() => {
    const loadConfig = async () => {
      try {
        const data = await fetchEntityConfig();
        setConfigData(data);
      } catch (error) {
        console.error('Error loading configuration:', error);
        showToast('Error loading configuration', 'error');
      } finally {
        setLoading(false);
      }
    };

    loadConfig();
  }, []);

  // Show loading state while fetching config
  if (loading) {
    return <LoadingState />;
  }

  // Reset form to initial state
  const resetForm = () => {
    setEntityName("");
    setAttributes([]);
    setCurrentAttribute(initialAttributeState);
    setIsCustomEntity(false);
    setSelectedEntity("");
  };

  // Handle entity save operation
  const handleSaveEntity = async (entity: Entity) => {
    const trimmedEntityName = entityName.trim();
    
    // Validate required fields
    if (!trimmedEntityName) {
      showToast("Entity Name is required!", 'error');
      return;
    }
    
    if (attributes.length === 0) {
      showToast("At least one attribute is required!", 'error');
      return;
    }
    setIsSaving(true);
    try {
      const result = await saveEntity(entity, token);
      if (result.success) {
        // Store entity info in localStorage instead of query params
        localStorage.setItem('newEntity', JSON.stringify({
          name: entity.entityName,
          message: result.message
        }));
        showToast(result.message, 'success');
        router.push('/entities');
      }
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'Failed to save entity', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      {isSaving && <FullPageLoader />}
      <Toaster />
      <div className="grid grid-cols-12 gap-4">
        {/* Left Column - Entity Setup Form - Now 5 columns */}
        <div className="col-span-4">
          <EntitySetup
            configData={configData}
            entityName={entityName}
            setEntityName={setEntityName}
            attributes={attributes}
            setAttributes={setAttributes}
            currentAttribute={currentAttribute}
            setCurrentAttribute={setCurrentAttribute}
            isCustomEntity={isCustomEntity}
            setIsCustomEntity={setIsCustomEntity}
            selectedEntity={selectedEntity}
            setSelectedEntity={setSelectedEntity}
            editingIndex={editingIndex}
            setEditingIndex={setEditingIndex}
            handleSaveEntity={handleSaveEntity}
            resetForm={resetForm}
            showToast={showToast}
          />
        </div>

        {/* Right Column - Preview and API Routes - Now 7 columns */}
        <div className="col-span-8 space-y-4">
          <EntityPreview
            attributes={attributes}
            setAttributes={setAttributes}
            setCurrentAttribute={setCurrentAttribute}
            handleSaveEntity={handleSaveEntity}
            resetForm={resetForm}
            setEditingIndex={setEditingIndex}
            entityName={entityName}
            showToast={showToast}
            isSaving={isSaving}
          />
          
          <EntityRoutes entityName={entityName} />
        </div>
      </div>
    </div>
  );
}