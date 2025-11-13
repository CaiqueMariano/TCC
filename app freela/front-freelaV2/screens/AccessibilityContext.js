// AccessibilityContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';

const AccessibilityContext = createContext();

export const AccessibilityProvider = ({  style,userId, children, minScale = 1, maxScale = 2, ...props }) => {
  const [scale, setScale] = useState(1);
  const limitedScale = Math.min(Math.max(scale, minScale), maxScale);

  // Função para salvar no backend
  const salvarScaleNoBackend = async (novoScale) => {
    try {
      await axios.post(`http://localhost:8000/api/salvarScale/${userId}`, { scale: novoScale });
      console.log("Scale salvo no backend:", novoScale);
    } catch (e) {
      console.log("Erro ao salvar scale:", e);
    }
  };

  // Aumentar/Diminuir/Resetar com persistência
  const increaseScale = () => {
    setScale(prev => {
      const novo = Math.min(prev + 0.1, 1.8);
      salvarScaleNoBackend(novo);
      return novo;
    });
  };

  const decreaseScale = () => {
    setScale(prev => {
      const novo = Math.max(prev - 0.1, 0.8);
      salvarScaleNoBackend(novo);
      return novo;
    });
  };

  const resetScale = () => {
    setScale(1);
    salvarScaleNoBackend(1);
  };

  // Buscar scale salvo no backend quando o app inicia
  useEffect(() => {
    const carregarScale = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/buscarScale/${userId}`);
        if (response.data?.scale) setScale(response.data.scale);
      } catch (e) {
        console.log("Erro ao buscar scale:", e);
      }
    };
    carregarScale();
  }, [userId]);

  return (
    <AccessibilityContext.Provider value={{ scale, increaseScale, decreaseScale, resetScale, setScale }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => useContext(AccessibilityContext);

// COMPONENTES FUNCIONAIS

export const EscalarText = ({ style, children, ...props }) => {
  const { scale } = useAccessibility(); // ✅ hook dentro de componente funcional
  const fontSize = style?.fontSize || 14;
  return (
    <Text style={[style, { fontSize: fontSize * scale }]} {...props}>
      {children}
    </Text>
  );
};

export const EscalarCard = ({ style, children, minScale = 1, maxScale = 1.5, ...props }) => {
  const { scale } = useAccessibility();
  
  // Limita o scale apenas para este card
  const limitedScale = Math.min(Math.max(scale, minScale), maxScale);

  return (
    <View
      style={[
        style,
        {
          width: style?.width ? style.width * limitedScale : undefined,
          height: style?.height ? style.height * limitedScale : undefined,
          padding: (style?.padding || 10) * limitedScale,
          borderRadius: (style?.borderRadius || 10) * limitedScale,
        },
      ]}
      {...props}
    >
      {children}
    </View>
  );
};


export const EscalarTouchable = ({ style, children, minScale = 1, maxScale = 1.5, ...props }) => {
  const { scale } = useAccessibility();
  const limitedScale = Math.min(Math.max(scale, minScale), maxScale);
  return (
    <TouchableOpacity
      style={[
        style,
        {
          padding: (style?.padding || 10) * scale,
          borderRadius: (style?.borderRadius || 10) * scale,
          width: style?.width ? style.width * scale : undefined,
          height: style?.height ? style.height * scale : undefined,
        },
      ]}
      {...props}
    >
      {children}
    </TouchableOpacity>
  );
};

export const EscalarSeparator = ({style,children,minScale = 1,maxScale = 1.5,...props}) => {
  const { scale } = useAccessibility();
  const limitedScale = Math.min(Math.max(scale, minScale), maxScale);

  return (
    <TouchableOpacity
      style={[
        style,
        {
          transform: [{ scale: limitedScale }],
          alignItems: "center",
          justifyContent: "center",
        },
      ]}
      {...props}
    >
      {children}
    </TouchableOpacity>
  );
};

export const EscalarImage = ({ style, minScale = 1, maxScale = 1.5, ...props }) => {
  const { scale } = useAccessibility();
  const limitedScale = Math.min(Math.max(scale, minScale), maxScale);
  return <Image style={[style, { width: (style?.width || 50) * scale, height: (style?.height || 50) * limitedScale }]} {...props} />;
};
