import React, { useState, Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, ContactShadows } from '@react-three/drei';

function Model({ lidColor, tubColor, autoRotate }) {
  const { nodes, materials } = useGLTF('/models/250ml_round.glb');
  const group = useRef();

  useFrame((state, delta) => {
    if (autoRotate && group.current) {
      group.current.rotation.y += delta * 0.5;
    }
  });

  // Apply colors to materials. Assuming the GLB has standard material names or we apply it to everything.
  // Since we don't know the exact material names inside 250ml_round.glb without inspecting it,
  // we will traverse the nodes and try to apply colors. Usually there's a body and a cap.
  
  // Safe material overriding (creates clones to avoid mutating cached GLTF)
  React.useEffect(() => {
    Object.values(materials).forEach((material) => {
      const matName = material.name ? material.name.toLowerCase() : '';
      // Only modify the color, leave original PBR properties intact
      if (matName.includes('lid') || matName.includes('cap')) {
        if(material.color) material.color.set(lidColor);
      } else {
        if(material.color) material.color.set(tubColor);
      }
    });
  }, [materials, lidColor, tubColor]);

  return (
    <group ref={group} dispose={null}>
      {/* Recursively render all meshes in the GLB */}
      {Object.values(nodes).map((node) => {
        if (node.isMesh) {
          return (
            <mesh
              key={node.uuid}
              geometry={node.geometry}
              material={materials[node.material.name]}
              position={node.position}
              rotation={node.rotation}
              scale={node.scale}
              castShadow
              receiveShadow
            />
          );
        }
        return null;
      })}
    </group>
  );
}

export default function ProductCustomizer() {
  const [lidColor, setLidColor] = useState('#10b981');
  const [tubColor, setTubColor] = useState('#ffffff');
  const [autoRotate, setAutoRotate] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);
  const controlsRef = useRef();

  const handleReset = () => {
    setLidColor('#10b981');
    setTubColor('#ffffff');
    setAutoRotate(true);
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  const colors = ['#ffffff', '#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#1e293b'];

  React.useEffect(() => {
    const handleZoomIn = () => setZoomLevel(1.4);
    const handleZoomOut = () => setZoomLevel(1);
    
    document.addEventListener('patternAppZoomIn', handleZoomIn);
    document.addEventListener('patternAppZoomOut', handleZoomOut);
    
    return () => {
      document.removeEventListener('patternAppZoomIn', handleZoomIn);
      document.removeEventListener('patternAppZoomOut', handleZoomOut);
    };
  }, []);

  return (
    <div className="customizer-container" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      
      {/* 3D Canvas Area */}
      <div className="canvas-wrapper" style={{ 
        flex: 1, 
        position: 'relative', 
        background: '#0b1120', /* Clean background matching phone */
        transform: `scale(${zoomLevel})`,
        transformOrigin: 'center center',
        transition: 'transform 1s cubic-bezier(0.16, 1, 0.3, 1)',
        overflow: 'hidden'
      }}>
        <Canvas shadows camera={{ position: [0, 1.0, 4.0], fov: 40 }}>
          <ambientLight intensity={0.6} />
          <spotLight position={[10, 10, 10]} angle={0.2} penumbra={1} intensity={1.5} castShadow />
          <Environment preset="city" />
          
          <Suspense fallback={null}>
            <group scale={9} position={[0, -0.4, 0]}>
              <Model lidColor={lidColor} tubColor={tubColor} autoRotate={autoRotate} />
            </group>
            <ContactShadows position={[0, -1.2, 0]} opacity={0.6} scale={10} blur={2.5} far={4} />
          </Suspense>
          
          <OrbitControls 
            ref={controlsRef}
            enablePan={false} 
            enableZoom={true} 
            minPolarAngle={Math.PI / 6} 
            maxPolarAngle={Math.PI / 1.5} 
          />
        </Canvas>
        
        {/* Floating Controls */}
        <div style={{ position: 'absolute', top: 20, right: 20, display: 'flex', gap: '10px' }}>
          <button 
            onClick={handleReset}
            title="Reset Model"
            style={{ 
              background: 'rgba(255,255,255,0.1)', 
              border: '1px solid rgba(255,255,255,0.2)', 
              color: '#fff', 
              padding: '8px', 
              borderRadius: '50%',
              cursor: 'pointer',
              backdropFilter: 'blur(4px)'
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
          </button>
          
          <button 
            onClick={() => setAutoRotate(!autoRotate)}
            title="Toggle Rotation"
            style={{ 
              background: 'rgba(255,255,255,0.1)', 
              border: '1px solid rgba(255,255,255,0.2)', 
              color: '#fff', 
              padding: '8px', 
              borderRadius: '50%',
              cursor: 'pointer',
              backdropFilter: 'blur(4px)'
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={autoRotate ? "#10b981" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          </button>
        </div>
      </div>

      {/* Customization UI Area */}
      <div className="customizer-ui" style={{ padding: '20px', background: '#0f172a', borderTop: '1px solid rgba(255,255,255,0.05)', flexShrink: 0 }}>
        
        <h3 style={{ color: '#fff', margin: '0 0 10px', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>Lid Color</h3>
        <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '15px' }}>
          {colors.map(color => (
            <div 
              key={`lid-${color}`}
              className="lid-color-btn"
              onClick={() => setLidColor(color)}
              style={{
                width: '30px', height: '30px', borderRadius: '50%', background: color, flexShrink: 0,
                cursor: 'pointer', border: lidColor === color ? '2px solid #10b981' : '2px solid transparent',
                boxShadow: '0 4px 6px rgba(0,0,0,0.3)', transition: 'transform 0.2s'
              }}
            />
          ))}
        </div>

        <h3 style={{ color: '#fff', margin: '5px 0 10px', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>Tub Color</h3>
        <div style={{ display: 'flex', gap: '10px', overflowX: 'auto' }}>
          {colors.map(color => (
            <div 
              key={`tub-${color}`}
              className="tub-color-btn"
              onClick={() => setTubColor(color)}
              style={{
                width: '30px', height: '30px', borderRadius: '50%', background: color, flexShrink: 0,
                cursor: 'pointer', border: tubColor === color ? '2px solid #10b981' : '2px solid transparent',
                boxShadow: '0 4px 6px rgba(0,0,0,0.3)', transition: 'transform 0.2s'
              }}
            />
          ))}
        </div>
        
        <button style={{ 
          width: '100%', padding: '15px', background: '#10b981', color: '#fff', 
          border: 'none', borderRadius: '12px', marginTop: '20px', fontWeight: 'bold',
          cursor: 'pointer', fontSize: '16px'
        }}>
          Save Design
        </button>

      </div>
    </div>
  );
}
