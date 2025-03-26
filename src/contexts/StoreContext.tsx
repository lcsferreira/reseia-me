import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { Store, StoreSettings, EcommerceIntegration } from "../models/Store";
import { MockedStoresData } from "../mock/Stores";

interface StoreContextType {
  stores: Store[];
  selectedStore: Store | null;
  isLoading: boolean;
  error: string | null;
  selectStore: (storeId: number) => void;
  updateStoreSettings: (
    storeId: number,
    settings: StoreSettings
  ) => Promise<boolean>;
  updateEcommerceIntegration: (
    storeId: number,
    integration: EcommerceIntegration | null
  ) => Promise<boolean>;
  createStore: (
    store: Omit<Store, "id" | "createdAt" | "updatedAt">
  ) => Promise<Store>;
  deleteStore: (storeId: number) => Promise<boolean>;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore deve ser usado dentro de um StoreProvider");
  }
  return context;
};

interface StoreProviderProps {
  children: ReactNode;
}

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const [stores, setStores] = useState<Store[]>([]);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Carregar lojas mockadas no início
  useEffect(() => {
    // Simula uma chamada de API
    const fetchStores = async () => {
      try {
        setIsLoading(true);
        // Simulando um delay de carregamento
        await new Promise((resolve) => setTimeout(resolve, 800));
        setStores(MockedStoresData);
        setIsLoading(false);
      } catch (err) {
        setError("Erro ao carregar lojas");
        setIsLoading(false);
      }
    };

    fetchStores();
  }, []);

  const selectStore = (storeId: number) => {
    const store = stores.find((s) => s.id === storeId);
    if (store) {
      setSelectedStore(store);
    } else {
      setError("Loja não encontrada");
    }
  };

  const updateStoreSettings = async (
    storeId: number,
    settings: StoreSettings
  ): Promise<boolean> => {
    try {
      setIsLoading(true);
      // Simula um delay de API
      await new Promise((resolve) => setTimeout(resolve, 500));

      setStores((currentStores) =>
        currentStores.map((store) =>
          store.id === storeId
            ? {
                ...store,
                settings,
                updatedAt: new Date()
                  .toISOString()
                  .replace("T", " ")
                  .substring(0, 19),
              }
            : store
        )
      );

      // Atualiza a loja selecionada, se for a mesma
      if (selectedStore && selectedStore.id === storeId) {
        setSelectedStore((prev) =>
          prev
            ? {
                ...prev,
                settings,
                updatedAt: new Date()
                  .toISOString()
                  .replace("T", " ")
                  .substring(0, 19),
              }
            : null
        );
      }

      setIsLoading(false);
      return true;
    } catch (err) {
      setError("Erro ao atualizar configurações da loja");
      setIsLoading(false);
      return false;
    }
  };

  const updateEcommerceIntegration = async (
    storeId: number,
    integration: EcommerceIntegration | null
  ): Promise<boolean> => {
    try {
      setIsLoading(true);
      // Simula um delay de API
      await new Promise((resolve) => setTimeout(resolve, 500));

      setStores((currentStores) =>
        currentStores.map((store) =>
          store.id === storeId
            ? {
                ...store,
                ecommerceIntegration: integration,
                updatedAt: new Date()
                  .toISOString()
                  .replace("T", " ")
                  .substring(0, 19),
              }
            : store
        )
      );

      // Atualiza a loja selecionada, se for a mesma
      if (selectedStore && selectedStore.id === storeId) {
        setSelectedStore((prev) =>
          prev
            ? {
                ...prev,
                ecommerceIntegration: integration,
                updatedAt: new Date()
                  .toISOString()
                  .replace("T", " ")
                  .substring(0, 19),
              }
            : null
        );
      }

      setIsLoading(false);
      return true;
    } catch (err) {
      setError("Erro ao atualizar integração de e-commerce");
      setIsLoading(false);
      return false;
    }
  };

  const createStore = async (
    store: Omit<Store, "id" | "createdAt" | "updatedAt">
  ): Promise<Store> => {
    try {
      setIsLoading(true);
      // Simula um delay de API
      await new Promise((resolve) => setTimeout(resolve, 800));

      const newStore: Store = {
        ...store,
        id: Math.max(0, ...stores.map((s) => s.id)) + 1,
        createdAt: new Date().toISOString().replace("T", " ").substring(0, 19),
        updatedAt: new Date().toISOString().replace("T", " ").substring(0, 19),
      };

      setStores((currentStores) => [...currentStores, newStore]);
      setIsLoading(false);
      return newStore;
    } catch (err) {
      setError("Erro ao criar loja");
      setIsLoading(false);
      throw new Error("Falha ao criar loja");
    }
  };

  const deleteStore = async (storeId: number): Promise<boolean> => {
    try {
      setIsLoading(true);
      // Simula um delay de API
      await new Promise((resolve) => setTimeout(resolve, 500));

      setStores((currentStores) =>
        currentStores.filter((store) => store.id !== storeId)
      );

      // Se a loja selecionada for a que foi apagada, limpa a seleção
      if (selectedStore && selectedStore.id === storeId) {
        setSelectedStore(null);
      }

      setIsLoading(false);
      return true;
    } catch (err) {
      setError("Erro ao excluir loja");
      setIsLoading(false);
      return false;
    }
  };

  const value = {
    stores,
    selectedStore,
    isLoading,
    error,
    selectStore,
    updateStoreSettings,
    updateEcommerceIntegration,
    createStore,
    deleteStore,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
