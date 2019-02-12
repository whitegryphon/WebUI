<?php
/**
 * Created by PhpStorm.
 * User: jcicak
 * Date: 11/13/2018
 * Time: 04:11 PM
 */

namespace Segs\WebUI;

use Nekland\Woketo\Message\MessageHandlerInterface;
use Nekland\Woketo\Core\AbstractConnection;
use Nekland\Woketo\Exception\WebsocketException;


class WsMessageHandler implements MessageHandlerInterface
{
    public function onConnection(AbstractConnection $connection)
    {
        // This method is called when a new client is connected to your server
    }

    public function onMessage(string $data, AbstractConnection $connection)
    {
        // This method is called when a text message is sent
        //$connection->write($data);
    }

    public function onBinary(string $data, AbstractConnection $connection)
    {
        // This method is called when a binary message is sent
    }

    public function onError(WebsocketException $e, AbstractConnection $connection)
    {
        // This method is called when an error occurs
    }

    public function onDisconnect(AbstractConnection $connection)
    {
        // TODO: Implement onDisconnect() method.
    }
}

