import { useEffect, useRef, useState } from 'react';
import Button from '../Util/Button';
import cssClasses from './ResultCard.module.css';

export default function ResultCard({saltObj}){
    const [currentFSPNames, setCurrentFSPNames] = useState({
        form : saltObj.most_common.Form,
        strength : saltObj.most_common.Strength,
        packing : saltObj.most_common.Packing
    });

    const [sellingPricesAry, setSellingPricesAry] = useState([]);

    const [currentSaltForm, setCurrentSaltForm] = useState(saltObj.salt_forms_json[currentFSPNames.form]);
    const [currentFormStrength, setCurrentFormStrength] = useState(saltObj.salt_forms_json[currentFSPNames.form][currentFSPNames.strength]);
    const [currentStrengthPkging, setCurrentStrengthPkging] = useState(saltObj.salt_forms_json[currentFSPNames.form][currentFSPNames.strength][currentFSPNames.packing]);

    const [isShowMoreForms, setIsShowMoreForm] = useState(false);
    const [isShowMoreStrengths, setIsShowMoreStrengths] = useState(false);
    const [isShowMorePackings, setIsShowMorePackings] = useState(false);

    useEffect(()=>{
        setSellingPricesAry([]);
        Object.entries(currentStrengthPkging).map(([productId, pharmacyDetails])=>{
            (pharmacyDetails !== null) &&
                pharmacyDetails.map((pharmacy)=>{
                    setSellingPricesAry((preVal)=>{
                        const newVal = [pharmacy.selling_price, ...preVal];
                        return newVal;
                    });
                })
           
            
        })
        
    },[currentStrengthPkging])

    function onFormButtonClick(newFormName){
        const newStrengthName = Object.keys(saltObj.salt_forms_json[newFormName])[0];
        const newPackingName = Object.keys(saltObj.salt_forms_json[newFormName][newStrengthName])[0];  
        setCurrentFSPNames((preVal)=>{
            return { 
                ...preVal, 
                form : newFormName,
                strength : newStrengthName,
                packing : newPackingName
            }
        })

        setCurrentSaltForm(saltObj.salt_forms_json[newFormName]);
        setCurrentFormStrength(saltObj.salt_forms_json[newFormName][newStrengthName]);
        setCurrentStrengthPkging(saltObj.salt_forms_json[newFormName][newStrengthName][newPackingName]);
    }

    function onStrengthButtonClick(newStrengthName){
        const newPackingName = Object.keys(saltObj.salt_forms_json[currentFSPNames.form][newStrengthName])[0];  
        setCurrentFSPNames((preVal)=>{
            return { 
                ...preVal, 
                // form : newFormName,
                strength : newStrengthName,
                packing : newPackingName
            }
        })

        setCurrentFormStrength(saltObj.salt_forms_json[currentFSPNames.form][newStrengthName]);
        setCurrentStrengthPkging(saltObj.salt_forms_json[currentFSPNames.form][newStrengthName][newPackingName]);
    }

    function onPackingButtonClick(newPackingName){
        setCurrentFSPNames((preVal)=>{
            return { 
                ...preVal, 
                // form : newFormName,
                // strength : newStrengthName,
                packing : newPackingName
            }
        })
        setCurrentStrengthPkging(saltObj.salt_forms_json[currentFSPNames.form][currentFSPNames.strength][newPackingName]);
    }

    return(
        <div className={cssClasses.result_card}>
            {/* ///Left block/// */}
            <div className={cssClasses.left_block}>
                <div className={cssClasses.row}>
                    <span 
                        className={cssClasses.left_block_heading} 
                        style={{marginRight:'3.2rem'}}
                    >
                        Form:
                    </span>
                    <div>
                        {saltObj.available_forms.slice(0, isShowMoreForms ? Object.keys(currentSaltForm).length : 3).map((form)=>(
                            <Button 
                                key={form}
                                butText={form}
                                isAvailable={true}
                                isActive={currentFSPNames.form === form ? true : false}
                                handleClick={onFormButtonClick}
                            />
                        ))}
                        {!isShowMoreForms && saltObj.available_forms.length > 3 && (
                            <button 
                                className={cssClasses.showMoreHideBut}
                                onClick={()=>setIsShowMoreForm(!isShowMoreForms)}
                            >
                                more..
                            </button>
                        )}
                        {isShowMoreForms && (
                            <button 
                                className={cssClasses.showMoreHideBut}
                                onClick={()=>setIsShowMoreForm(!isShowMoreForms)}
                            >
                                hide..
                            </button>
                        )}
                    </div>
                </div>
                <div className={cssClasses.row}>
                    <span 
                        className={cssClasses.left_block_heading}
                        style={{marginRight:'1.5rem'}}
                    >
                        Strength:
                    </span>
                    <div>
                        {Object.keys(currentSaltForm).slice(0, isShowMoreStrengths ? Object.keys(currentSaltForm).length : 3).map((strength)=>(
                            <Button 
                                key={strength}
                                butText={strength}
                                isAvailable={true}
                                isActive={currentFSPNames.strength === strength ? true : false}
                                handleClick={onStrengthButtonClick}
                            />
                        ))}
                        {!isShowMoreStrengths && Object.keys(currentSaltForm).length > 3 && (
                            <button 
                                className={cssClasses.showMoreHideBut}
                                onClick={()=>setIsShowMoreStrengths(!isShowMoreStrengths)}
                            >
                                more..
                            </button>
                        )}
                        {isShowMoreStrengths && (
                            <button 
                                className={cssClasses.showMoreHideBut}
                                onClick={()=>setIsShowMoreStrengths(!isShowMoreStrengths)}
                            >
                                hide..
                            </button>
                        )}
                    </div>
                </div>
                <div className={cssClasses.row}>
                    <span 
                        className={cssClasses.left_block_heading} 
                        style={{marginRight:'0.5rem'}}
                    >
                        Packaging:
                    </span>
                    <div>
                    {Object.keys(currentFormStrength).slice(0, isShowMorePackings ? Object.keys(currentFormStrength).length : 3).map((packing)=>(
                        <Button 
                            key={packing} 
                            butText={packing}
                            isAvailable={Object.values(currentFormStrength[packing]).some(item => item !== null) ? true : false }
                            isActive={currentFSPNames.packing === packing ? true : false}
                            handleClick={onPackingButtonClick}
                        />
                    ))}
                    {!isShowMorePackings && Object.keys(currentFormStrength).length > 3 && (
                        <button 
                            className={cssClasses.showMoreHideBut}
                            onClick={()=>setIsShowMorePackings(!isShowMorePackings)}
                        >
                            more..
                        </button>
                    )}
                    {isShowMorePackings && (
                        <button 
                            className={cssClasses.showMoreHideBut}
                            onClick={()=>setIsShowMorePackings(!isShowMorePackings)}
                        >
                            hide..
                        </button>
                    )}
                    </div>
                </div>
            </div>

            {/* ///Center block/// */}
            <div className={cssClasses.center_block}>
                <span className={cssClasses.salt_name_heading}>{saltObj.salt}</span>
                <span className={cssClasses.current_combination}>{currentFSPNames.form} | {currentFSPNames.strength} | {currentFSPNames.packing}</span>
            </div>

            {/* ///Right block/// */}
            <div className={cssClasses.right_block}>
                {
                    (sellingPricesAry.length !== 0)
                    ?
                        <span className={cssClasses.rate}>From&#8377;{Math.min(...sellingPricesAry)}</span>
                    :
                        <div className={cssClasses.no_store_selling_box}>
                            <span>No stores selling this product near you</span>
                        </div>
                }
            </div>
        </div>
    )
}