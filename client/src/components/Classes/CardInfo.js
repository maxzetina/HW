import { Callout, FontWeights, mergeStyleSets, Text } from '@fluentui/react';
import { useId } from '@fluentui/react-hooks';
import { useMemo } from 'react';

const CardInfo = (props) => {
    const labelId = useId('callout-label');
    const descriptionId = useId('callout-description');
    const styles = mergeStyleSets({
        callout: {
          width: 320,
          maxWidth: '90%',
          padding: '20px 24px',
        },
        title: {
          marginBottom: 12,
          fontWeight: FontWeights.regular,
        },
    });

    const lecsRec = useMemo(() => {
        let text = "Lectures Recorded";
        let color = "green";
        if (!props.lecturesRecorded){
            text = "Lectures NOT Recorded";
            color = "red";
        }
        return <Text block variant='medium' style={{color: color}}>{text}</Text>
    }, [props.lecturesRecorded])
    
    const psetStatus = useMemo(() => {
        let text = "CANNOT DROP PSET"
        if(props.psetDroppable){
            if (props.psetDropped){
                text = "PSET DROPPED";
            }
            else{
                text = "CAN DROP PSET";
            }
        }
        return <Text block variant='medium'>{text}</Text>
    }, [props.psetDroppable, props.psetDropped]);

    return (
        <Callout
            className={styles.callout}
            role="dialog"
            gapSpace={0}
            onDismiss={props.toggleIsCalloutVisible}
            setInitialFocus
            ariaLabelledBy={labelId}
            ariaDescribedBy={descriptionId}
            target={`#${props.buttonId}`}
            >
                <Text as="h1" block variant="xLarge" id={labelId} className={styles.title}>
                    Details
                </Text>
                {lecsRec}
                <Text block variant="medium" id={descriptionId}>
                    <Text style={{fontWeight: FontWeights.semibold}}>Late Days:</Text> {props.lateDays}
                </Text>
                <Text block variant="medium" id={descriptionId}>
                    <Text style={{fontWeight: FontWeights.semibold}}>Missable Recs:</Text> {props.missableRecsLeft}
                </Text>

                {psetStatus}
        </Callout>
    )
}

export default CardInfo;