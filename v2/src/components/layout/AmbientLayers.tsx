import LightLeaksCanvas from './LightLeaksCanvas';

export default function AmbientLayers() {
    return (
        <div className="atmosphere" aria-hidden="true">
            <div className="atmosphere__layer atmosphere__layer--ambiance" />
            <div className="atmosphere__layer atmosphere__layer--halo" />
            <div className="atmosphere__layer atmosphere__layer--dust" />
            <div className="atmosphere__layer atmosphere__layer--texture" />
            <LightLeaksCanvas />
        </div>
    );
}
