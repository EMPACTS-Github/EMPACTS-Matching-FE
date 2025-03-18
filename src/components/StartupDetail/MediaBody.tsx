import ImageGallery from './ImageGallery';



const images: string[] = [
    // 'https://s3-alpha-sig.figma.com/img/8139/0907/13ef21e242510b322eace4ac72162a61?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=IP1uRrdMxe9xhYK-3pVheVGRAB9HPVVogQuZ-twYe0zmxwc1OmiUD4g8e0YJyF~Ut6UHZgK37at687yoskDAqipU4ik648RQihAdkyXSiJQC3GQlpW2gmBVAWG~KCvfV~1pbOXFJz5y88TYEoDCP2zCSUPOgggC-KpLMW~UwywQDnJwO2qMw1osFj-q91FWjLI9VVABqSaAgC1Dt1ZCOLnpFwLc8fT8AUUyoZBOJ6ST80nZElnxvFFBnDXxSQ5Dx8gEvQwLUwccXVuLTsf2M1mSWF0K9wFEclykyZh5EfYDI3d6sdtdxPYmg3eEg0eWR3vbFX5k8Rd-a~Nr~oFPk~g__',
    // 'https://img.freepik.com/premium-vector/business-meeting-vector-illustration-professional-collaboration-design_1301270-11849.jpg?semt=ais_hybrid',
];

const MediaBody = () => {
    return (
        <div className="flex items-center">
            <ImageGallery images={images} />
        </div>
    );
}

export default MediaBody;