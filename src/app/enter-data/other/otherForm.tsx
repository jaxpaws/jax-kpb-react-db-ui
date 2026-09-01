'use client'

import { useCallback, useEffect, useState, useRef } from 'react';
import { ErrorSummary, RadioList } from '../../components';
import { ErrorModel } from '../../models';
import { ComboBoxListItemModel } from '../../components/comboBox/comboBoxListItem.model';
import { OtherFormByActivity } from './otherFormByActivity';
import {
    getEducationRecipients,
    getEducationTopics,
    saveBagSwapData,
    saveEducationData,
    saveTreePlantingData
} from './actions';
import { REPORTING_DATA_TYPE_LIST_NAME, REPORTING_DATA_TYPE_OPTIONS, REPORTING_DATA_VALUES } from './otherJson';
import { isBlank } from '../../utils/isBlank';
import { DialogType } from '../../components/dialog/dialogType.model';
import { OtherDialogs } from './otherDialogs';

export function OtherForm({ isUpdate, selectedDataType }: { isUpdate: boolean, selectedDataType: string }) {
    const [isRecipientDialogOpen, setIsRecipientDialogOpen] = useState<boolean>(false);
    const [isTopicDialogOpen, setIsTopicDialogOpen] = useState<boolean>(false);
    const [reportingDataType, setReportingDataType] = useState<string>(selectedDataType);
    const [errors, setErrors] = useState<Map<string, ErrorModel>>(new Map<string, ErrorModel>());

    const [edRecipientOptions, setEdRecipientOptions] = useState<string>('[]');
    const [areEdRecipientsRetrieved, setAreEdRecipientsRetrieved] = useState<boolean>(false);
    const [edRecipientValueToIdMap, setEdRecipientValueToIdMap] = useState<Map<string, string>>(new Map<string, string>());

    const [edTopicOptions, setEdTopicOptions] = useState<string>('[]');
    const [areEdTopicsRetrieved, setAreEdTopicsRetrieved] = useState<boolean>(false);
    const [edTopicValueToIdMap, setEdTopicValueToIdMap] = useState<Map<string, string>>(new Map<string, string>());

    const [selectedEdRecipient, setSelectedEdRecipient] = useState<string>('');
    const [selectedEdTopic, setSelectedEdTopic] = useState<string>('');
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (!areEdRecipientsRetrieved) {
            setAreEdRecipientsRetrieved(true);
            getEdRecipients();
        }

        if (!areEdTopicsRetrieved) {
            setAreEdTopicsRetrieved(true);
            getEdTopics();
        }

        if (formRef.current) {
            formRef.current.addEventListener('keydown', (event: any) => {
                if (event.target && event.key === 'Enter' && event.target.role === 'comboBox') {
                    event.preventDefault();
                }
            });
        }
    }, [areEdRecipientsRetrieved, areEdTopicsRetrieved]);

    const getEdRecipients: any = useCallback((onSuccessFn?: () => void) => {
        getEducationRecipients().then((recipients) => {
            if (!isBlank(recipients) && recipients !== '[]') {
                setEdRecipientOptions(recipients);
                let recipientValueToIdMap: Map<string, string> = new Map<string, string>();
                JSON.parse(recipients).map((recipient: ComboBoxListItemModel) => {
                    recipientValueToIdMap.set(recipient.label, recipient.key);
                });
                setEdRecipientValueToIdMap(recipientValueToIdMap);
                if (onSuccessFn) {
                    onSuccessFn();
                }
            }
        });
    }, []);

    const getEdTopics: any = useCallback((onSuccessFn?: () => void) => {
        getEducationTopics().then((topics) => {
            if (!isBlank(topics) && topics !== '[]') {
                setEdTopicOptions(topics);
                let topicValueToIdMap: Map<string, string> = new Map<string, string>();
                JSON.parse(topics).map((topic: ComboBoxListItemModel) => {
                    topicValueToIdMap.set(topic.label, topic.key);
                });
                setEdTopicValueToIdMap(topicValueToIdMap);
                if (onSuccessFn) {
                    onSuccessFn();
                }
            }
        });
    }, []);

    const handleReportingDataTypeChange: any = useCallback((event: any) => {
        setReportingDataType(event.target.value);
        setErrors(new Map<string, ErrorModel>());
    }, []);

    async function handleSubmit(e: any) {
        e.preventDefault();
        let newErrors: Map<string, ErrorModel> = new Map<string, ErrorModel>();

        switch (reportingDataType) {
            case REPORTING_DATA_VALUES.bagSwap:
                newErrors = await saveBagSwapData(
                    new FormData(e.target),
                    isUpdate
                );
                console.log(newErrors);
                setErrors(newErrors);
                break;
            case REPORTING_DATA_VALUES.education:
                const selectedRecipientId: string | undefined = edRecipientValueToIdMap.has(selectedEdRecipient)
                    ? edRecipientValueToIdMap.get(selectedEdRecipient) : '';
                const selectedTopicId: string | undefined = edTopicValueToIdMap.has(selectedEdTopic)
                    ? edTopicValueToIdMap.get(selectedEdTopic) : '';
                newErrors = await saveEducationData(
                    new FormData(e.target),
                    selectedRecipientId ? selectedRecipientId : '',
                    selectedTopicId ? selectedTopicId : '',
                    isUpdate
                );
                console.log(newErrors);
                setErrors(newErrors);
                break;
            case REPORTING_DATA_VALUES.treePlanting:
                newErrors = await saveTreePlantingData(
                    new FormData(e.target),
                    isUpdate
                );
                console.log(newErrors);
                setErrors(newErrors);
                break;
        }

        if (newErrors !== null && newErrors.size > 0) {
            setTimeout(() => {
                const errorHeader = document.getElementById('error-header');
                if (errorHeader) {
                    errorHeader.focus();
                    window.scroll(0, 0);
                }
            }, 100);
        }
    }

    function handleAddRecipient(newRecipient: string) {
        if (!isBlank(newRecipient)) {
            setIsRecipientDialogOpen(false);
            getEdRecipients(() => {
                setSelectedEdRecipient(newRecipient);
            });
        }
    }

    function handleAddTopic(newTopic: string) {
        if (!isBlank(newTopic)) {
            setIsTopicDialogOpen(false);
            getEdTopics(() => {
                setSelectedEdTopic(newTopic);
            });
        }
    }

    return (
        <div>
            <OtherDialogs
                isRecipientOpen={isRecipientDialogOpen}
                onCloseRecipient={(e: any) => setIsRecipientDialogOpen(false)}
                onAddRecipient={handleAddRecipient}
                currentRecipientValues={edRecipientValueToIdMap}
                isTopicOpen={isTopicDialogOpen}
                onCloseTopic={(e: any) => setIsTopicDialogOpen(false)}
                onAddTopic={handleAddTopic}
                currentTopicValues={edTopicValueToIdMap}>
            </OtherDialogs>
            
            <form ref={formRef} className="flex flex-col gap-2" onSubmit={handleSubmit}>
                {(errors && errors.size >= 1) &&
                    <ErrorSummary errors={JSON.stringify(Array.from(errors.values()))}></ErrorSummary>}
                <h1 id="main-content-header" className="text-xl md:text-2xl" tabIndex={-1}>
                    {isUpdate ? 'Update' : 'Enter'} Data: Other Data
                </h1>
                {!isUpdate &&
                    <RadioList
                        label="Reporting Data Type"
                        listName={REPORTING_DATA_TYPE_LIST_NAME}
                        options={JSON.stringify(REPORTING_DATA_TYPE_OPTIONS)}
                        isRequired={true}
                        selectedValue={reportingDataType}
                        handleChange={handleReportingDataTypeChange}>
                    </RadioList>
                }
                <OtherFormByActivity
                    activity={reportingDataType}
                    educationRecipients={edRecipientOptions}
                    selectedEducationRecipient={selectedEdRecipient}
                    educationTopics={edTopicOptions}
                    selectedEducationTopic={selectedEdTopic}
                    errors={errors}
                    handleEdRecipientChange={setSelectedEdRecipient}
                    handleEdTopicChange={setSelectedEdTopic}
                    onAddRecipient={() => setIsRecipientDialogOpen(true)}
                    onAddTopic={() => setIsTopicDialogOpen(true)}>
                </OtherFormByActivity>
                {reportingDataType !== '' &&
                    <button className="border p-2 w-25 rounded-md bg-[var(--foreground)] text-[var(--background)] text-[1.06rem] mt-4 mb-4">
                        Submit
                    </button>
                }
            </form>
        </div>
    );
}