<?php

require_once __DIR__ . '/conf.php';

class Utility
{
    /**
     * Get app records.
     *
     * @param string $object
     * @param array  $options
     * @return array
     */
    public function apiSelect($object, $options = [])
    {
        $instance = new $object();

        if (!empty($options)) {
            foreach ($options as $keys => $values) {
                $instance->{$keys} = $values;
            }
        }
        return $instance->select_id();
    }

    /**
     * Get app record.
     *
     * @param string $object
     * @param array  $ids
     * @return array
     */
    public function apiSelectRec($object, $ids)
    {
        $instance = new $object();
        return $instance->selectRec($ids);
    }

    /**
     * App records registration.
     *
     * @param string $object
     * @param array  $data
     * @return bool
     */
    public function apiInsert($object, $data)
    {
        $instance = new $object();

        for ($cnt = 0; $cnt <= count($data); $cnt += API_PROC_UPPER_LIMIT) {
            $records = array_slice($data, $cnt, API_PROC_UPPER_LIMIT);

            if (!empty($records)) {
                $res = $instance->insert($records);

                if (!$res) {
                    return false;
                }
            }
        }
        return true;
    }

    /**
     * App record registration.
     *
     * @param string $object
     * @param array  $ids
     * @return bool
     */
    public function apiInsertRec($object, $ids)
    {
        $instance = new $object();

        if (!empty($record)) {
            $res = $instance->insertRec($ids);

            if (!$res) {
                return false;
            }
        }
        return true;
    }

    /**
     * App records update.
     *
     * @param string $object
     * @param array  $data
     * @return bool
     */
    public function apiUpdate($object, $data)
    {
        $instance = new $object();

        for ($cnt = 0; $cnt <= count($data); $cnt += API_PROC_UPPER_LIMIT) {
            $records = array_slice($data, $cnt, API_PROC_UPPER_LIMIT);

            if (!empty($records)) {
                $res = $instance->update($records);

                if (!$res) {
                    return false;
                }
            }
        }
        return true;
    }

    /**
     * App record update.
     *
     * @param string $object
     * @param array  $ids
     * @return bool
     */
    public function apiUpdateRec($object, $ids)
    {
        $instance = new $object();

        if (!empty($record)) {
            $res = $instance->updateRec($ids);

            if (!$res) {
                return false;
            }
        }
        return true;
    }

    /**
     * Delete app records.
     *
     * @param string $object
     * @param array  $data
     * @return array
     */
    public function apiDelete($object, $data)
    {
        $instance = new $object();

        for ($cnt = 0; $cnt <= count($data); $cnt += API_PROC_UPPER_LIMIT) {
            $records = array_slice($data, $cnt, API_PROC_UPPER_LIMIT);

            if (!empty($records)) {
                $res = $instance->delete($records);

                if (!$res) {
                    return false;
                }
            }
        }
        return true;
    }

    /**
     * Delete app record.
     *
     * @param string $object
     * @param array  $ids
     * @return array
     */
    public function apiDeleteRec($object, $ids)
    {
        $instance = new $object();
        return $instance->deleteRec($ids);
    }

    /**
     * API results.
     *
     * @param bool   $status
     * @param bool   $result
     * @param string $code
     * @param array  $dataParam
     * @param array  $processResult
     * @param string $errorMessage
     * @return bool
     */
    public function apiReturn($status, $result, $code, $dataParam, $errorMessage = null, $processResult = [])
    {
        $return = [];
        $message = $this->_getResponseMessage($code);

        if ($message) {
            $responseParam = [
                'status' => $status,
                'result' => $result,
                'code' => $code,
                'message' => $message,
            ];

            if (!empty($dataParam)) {
                $responseParam['dataParam'] = $dataParam;
            }

            if (!empty($processResult)) {
                $responseParam['processResult'] = $processResult;
            }

            if ($errorMessage !== null) {
                $responseParam['error'] = $errorMessage;
            }
            $return = $this->_createResponse($responseParam);
            echo json_encode($return);
        }
    }

    /**
     * Response message.
     *
     * @param string $code
     * @return string, boolean
     */
    private function _getResponseMessage($code)
    {
        $message = null;

        switch ($code) {
            case '200':
                $message = 'OK';
                break;
            case '201':
                $message = 'Created';
                break;
            case '202':
                $message = 'Accepted';
                break;
            case '204':
                $message = 'No Content';
                break;
            case '400':
                $message = 'Bad Request';
                break;
            case '401':
                $message = 'Unauthorized';
                break;
            case '403':
                $message = 'Forbidden';
                break;
            case '404':
                $message = 'Not Found';
                break;
            case '405':
                $message = 'Method Not Allowed';
                break;
            case '409':
                $message = 'Conflict';
                break;
            case '415':
                $message = 'Unsupported Media Type';
                break;
            case '429':
                $message = 'Too Many Requests';
                break;
            case '500':
                $message = 'Internal Server Error';
                break;
            case '503':
                $message = 'Service Unavailable';
                break;
            default:
                break;
        }

        if ($message !== null) {
            return $message;
        }
        return false;
    }

    /**
     * Response generation.
     *
     * @param array $responseParam
     * @return array
     */
    private function _createResponse($responseParam)
    {
        $tempResponse = [];
        $tempResponse['status'] = $responseParam['status'];
        $tempResponse['result'] = $responseParam['result'];
        $tempResponse['code'] = $responseParam['code'];
        $tempResponse['message'] = $responseParam['message'];

        if (!empty($responseParam['dataParam'])) {
            $tempResponse['receives'] = $responseParam['dataParam'];
        }

        if (!empty($responseParam['processResult'])) {
            $tempResponse['procResult'] = $responseParam['processResult'];
        }

        if (!empty($responseParam['error'])) {
            $tempResponse['error'] = $responseParam['error'];
        }
        return $tempResponse;
    }
}
